"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Vocabulary = {
  id: number;
  term: string;
  meaning: string;
  topic: string;
  example: string;
  examples?: string[];
  sentenceIds?: number[];
};

type Grammar = {
  id: string;
  title: string;
  use: string;
  form: string;
  signal: string;
  toeicExample: string;
};

type Conversation = {
  id: number;
  topic: string;
  lines: string[];
};

type SentencePattern = {
  id: number;
  vocabularyId?: number;
  term?: string;
  topic: string;
  sentence: string;
  meaning: string;
};

type ReadingPassage = {
  id: number;
  title: string;
  topic: string;
  wordCount: number;
  targetTerms: string[];
  text: string;
};

type Quiz = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

type FillExercise = {
  id: number;
  prompt: string;
  meaning: string;
  answer: string;
  options: string[];
};

type MeaningExercise = {
  id: number;
  term: string;
  answer: string;
  options: string[];
};

type PassageBlank = {
  id: number;
  answer: string;
  meaning: string;
  options: string[];
};

type PassageFillExercise = {
  text: string;
  blanks: PassageBlank[];
};

type StudyLesson = {
  id: number;
  title: string;
  focus: string;
  topics: string[];
  vocabulary: Vocabulary[];
  reading?: ReadingPassage;
  conversation?: Conversation;
  tasks: string[];
};

type ToeicData = {
  stats: {
    words: number;
    grammar: number;
    sentences: number;
    conversations: number;
    readings?: number;
    exercises?: number;
  };
  vocabulary: Vocabulary[];
  grammar: Grammar[];
  sentences: string[];
  sentencePatterns?: SentencePattern[];
  conversations: Conversation[];
  readingPassages?: ReadingPassage[];
  quiz: Quiz[];
  studyPlan: string[];
};

type Tab = "vocabulary" | "grammar" | "sentences" | "conversation" | "reading" | "quiz" | "plan";

const tabs: { id: Tab; label: string }[] = [
  { id: "vocabulary", label: "Tu vung" },
  { id: "grammar", label: "Ngu phap" },
  { id: "sentences", label: "Mau cau" },
  { id: "conversation", label: "Giao tiep" },
  { id: "reading", label: "Doan van" },
  { id: "quiz", label: "Quiz" },
  { id: "plan", label: "Lo trinh" }
];

export default function StudyApp({ initialData }: { initialData: ToeicData }) {
  const [activeTab, setActiveTab] = useState<Tab>("vocabulary");
  const [topic, setTopic] = useState("all");
  const [studyMode, setStudyMode] = useState<"roadmap" | "tenses">("roadmap");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [learnedIds, setLearnedIds] = useState<number[]>([]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState(1);
  const [quizSeed, setQuizSeed] = useState(1);

  useEffect(() => {
    const savedProgress = window.localStorage.getItem("toeic-progress");
    if (!savedProgress) return;

    try {
      const parsed = JSON.parse(savedProgress) as {
        learnedIds?: number[];
        answers?: Record<string, string>;
        completedLessons?: number[];
      };
      setLearnedIds(parsed.learnedIds ?? []);
      setAnswers(parsed.answers ?? {});
      setCompletedLessons(parsed.completedLessons ?? []);
    } catch {
      window.localStorage.removeItem("toeic-progress");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("toeic-progress", JSON.stringify({ learnedIds, answers, completedLessons }));
  }, [learnedIds, answers, completedLessons]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
      return;
    }

    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => registrations.forEach((registration) => registration.unregister()))
      .catch(() => undefined);
  }, []);

  const topics = useMemo(() => {
    return ["all", ...Array.from(new Set(initialData.vocabulary.map((item) => item.topic)))];
  }, [initialData.vocabulary]);

  const filteredVocabulary = useMemo(() => {
    if (topic === "all") return initialData.vocabulary;
    return initialData.vocabulary.filter((item) => item.topic === topic);
  }, [initialData.vocabulary, topic]);

  const learnedSet = useMemo(() => new Set(learnedIds), [learnedIds]);
  const learnedVocabulary = useMemo(() => {
    return initialData.vocabulary.filter((item) => learnedSet.has(item.id));
  }, [initialData.vocabulary, learnedSet]);
  const activeVocabulary = learnedVocabulary.length > 0 ? learnedVocabulary.slice(-24) : filteredVocabulary.slice(0, 24);
  const activeTerms = useMemo(() => activeVocabulary.map((item) => item.term.toLowerCase()), [activeVocabulary]);
  const learnedQuiz = useMemo(
    () => buildLearnedQuiz(learnedVocabulary, initialData.vocabulary, quizSeed),
    [learnedVocabulary, initialData.vocabulary, quizSeed]
  );
  const lessons = useMemo(() => buildStudyLessons(initialData), [initialData]);
  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId) ?? lessons[0];
  const completedLessonSet = useMemo(() => new Set(completedLessons), [completedLessons]);
  const lessonQuiz = useMemo(
    () => buildLearnedQuiz(selectedLesson?.vocabulary ?? [], initialData.vocabulary, quizSeed),
    [selectedLesson, initialData.vocabulary, quizSeed]
  );
  const learnedScore = learnedQuiz.reduce((total, item) => {
    return total + (answers[`learned-${item.id}`] === item.answer ? 1 : 0);
  }, 0);
  const lessonScore = lessonQuiz.reduce((total, item) => {
    return total + (answers[`lesson-${item.id}`] === item.answer ? 1 : 0);
  }, 0);

  function toggleLearned(id: number) {
    setLearnedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function completeLesson(lesson: StudyLesson) {
    setCompletedLessons((current) => (current.includes(lesson.id) ? current : [...current, lesson.id]));
    setLearnedIds((current) => Array.from(new Set([...current, ...lesson.vocabulary.map((item) => item.id)])));
  }

  return (
    <main className="app-shell">
      <section className="hero" id="home">
        <Image
          className="hero-image"
          src="/toeic-hero.png"
          alt="Nguoi hoc TOEIC bang dien thoai"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-content">
          <p className="eyebrow">TOEIC Starter</p>
          <h1>Hoc TOEIC tu con so 0 tren dien thoai</h1>
          <p className="hero-copy">
            Tu vung, thi co ban, mau cau cong viec va giao tiep hang ngay duoc gom thanh cac phan
            ngan de hoc nhanh moi ngay.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#learn" onClick={() => setStudyMode("roadmap")}>
              Bat dau hoc
            </a>
            <a className="secondary-action" href="#learn" onClick={() => setStudyMode("tenses")}>
              Hoc cac thi
            </a>
          </div>
        </div>
      </section>

      <section className="section stats" aria-label="Thong ke noi dung">
        <Stat value={initialData.stats.words} label="tu vung TOEIC" />
        <Stat value={learnedIds.length} label="tu da hoc" />
        <Stat value={initialData.stats.grammar} label="chu diem ngu phap" />
        <Stat value={initialData.stats.sentences} label="mau cau ung dung" />
      </section>

      <section className="section" id="learn">
        <div className="section-title">
          <div>
            <h2>Hoc theo lo trinh</h2>
            <p>
              {lessons.length} ngay de hoc het {initialData.vocabulary.length} tu. Moi ngay gom tu vung, mau cau, hoi thoai, doan doc va quiz.
            </p>
          </div>
        </div>

        {studyMode === "roadmap" ? (
          <div className="roadmap-layout">
            <div className="lesson-rail" aria-label="Danh sach bai hoc">
              {lessons.map((lesson) => {
                const done = completedLessonSet.has(lesson.id);
                return (
                  <button
                    className={`lesson-nav ${lesson.id === selectedLesson.id ? "active" : ""} ${done ? "done" : ""}`}
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    type="button"
                  >
                    <span>Ngay {lesson.id}</span>
                    <strong>{lesson.title}</strong>
                  </button>
                );
              })}
            </div>
            <LessonView
              lesson={selectedLesson}
              learnedSet={learnedSet}
              completed={completedLessonSet.has(selectedLesson.id)}
              quiz={lessonQuiz}
              quizScore={lessonScore}
              answers={answers}
              sentencePatterns={initialData.sentencePatterns ?? []}
              onToggleLearned={toggleLearned}
              onCompleteLesson={completeLesson}
              onAnswer={(key, option) => setAnswers((current) => ({ ...current, [key]: option }))}
              onShuffleQuiz={() => setQuizSeed((current) => current + 1)}
            />
          </div>
        ) : (
          <TenseStudy grammar={initialData.grammar} />
        )}
      </section>

      <nav className="bottom-nav" aria-label="Dieu huong nhanh">
        <a className={studyMode === "roadmap" ? "active" : ""} href="#learn" onClick={() => setStudyMode("roadmap")}>
          Lo trinh
        </a>
        <a className={studyMode === "tenses" ? "active" : ""} href="#learn" onClick={() => setStudyMode("tenses")}>
          Cac thi
        </a>
      </nav>
    </main>
  );
}

function LessonView({
  lesson,
  learnedSet,
  completed,
  quiz,
  quizScore,
  answers,
  sentencePatterns,
  onToggleLearned,
  onCompleteLesson,
  onAnswer,
  onShuffleQuiz
}: {
  lesson: StudyLesson;
  learnedSet: Set<number>;
  completed: boolean;
  quiz: Quiz[];
  quizScore: number;
  answers: Record<string, string>;
  sentencePatterns: SentencePattern[];
  onToggleLearned: (id: number) => void;
  onCompleteLesson: (lesson: StudyLesson) => void;
  onAnswer: (key: string, option: string) => void;
  onShuffleQuiz: () => void;
}) {
  const lessonWordIds = new Set(lesson.vocabulary.map((item) => item.id));
  const lessonSentences = sentencePatterns.filter((item) => item.vocabularyId && lessonWordIds.has(item.vocabularyId)).slice(0, 16);
  const meaningExercises = buildMeaningExercises(lesson.vocabulary);
  const meaningScore = meaningExercises.reduce((total, item) => total + (answers[`meaning-${lesson.id}-${item.id}`] === item.answer ? 1 : 0), 0);
  const fillExercises = buildFillExercises(lesson.vocabulary);
  const fillScore = fillExercises.reduce((total, item) => total + (answers[`fill-${lesson.id}-${item.id}`] === item.answer ? 1 : 0), 0);
  const passageFill = lesson.reading ? buildPassageFillExercise(lesson.reading, lesson.vocabulary) : null;
  const passageFillScore =
    passageFill?.blanks.reduce((total, item) => total + (answers[`passage-fill-${lesson.id}-${item.id}`] === item.answer ? 1 : 0), 0) ?? 0;

  return (
    <div className="lesson-detail">
      <div className="plan-summary lesson-hero">
        <div>
          <p className="eyebrow lesson-day">Ngay {lesson.id}</p>
          <h3>{lesson.title}</h3>
          <p>{lesson.tasks.join(" ")}</p>
        </div>
        <button className="primary-action compact-action" onClick={() => onCompleteLesson(lesson)} type="button">
          {completed ? "Da hoan thanh" : "Hoan thanh"}
        </button>
      </div>

      <section className="lesson-section">
        <div className="lesson-section-title">
          <h3>1. Tu vung can hoc</h3>
          <span className="tag">{lesson.vocabulary.length} tu</span>
        </div>
        <div className="lesson-vocab-grid">
          {lesson.vocabulary.map((item) => (
            <article className={`item-card ${learnedSet.has(item.id) ? "learned-card" : ""}`} key={item.id}>
              <div className="item-top">
                <h3 className="term">{item.term}</h3>
                <button className="learn-toggle" onClick={() => onToggleLearned(item.id)} type="button">
                  {learnedSet.has(item.id) ? "Da hoc" : "Danh dau"}
                </button>
              </div>
              <p className="meaning">{item.meaning}</p>
              {(item.examples ?? [item.example]).slice(0, 2).map((example) => (
                <p className="example" key={example}>
                  {example}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="lesson-section">
        <div className="lesson-section-title">
          <h3>2. Ghep tu voi nghia</h3>
          <span className="tag">
            {meaningScore}/{meaningExercises.length}
          </span>
        </div>
        <div className="fill-list">
          {meaningExercises.map((item) => (
            <article className="fill-card" key={item.id}>
              <p className="meaning">{item.term}</p>
              <div className="fill-options">
                {item.options.map((option) => {
                  const picked = answers[`meaning-${lesson.id}-${item.id}`];
                  const className =
                    picked === option ? `topic-pill ${option === item.answer ? "correct-pill" : "wrong-pill"}` : "topic-pill";
                  return (
                    <button
                      className={className}
                      key={option}
                      onClick={() => onAnswer(`meaning-${lesson.id}-${item.id}`, option)}
                      type="button"
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <p className="explain">
                {answers[`meaning-${lesson.id}-${item.id}`] ? `Nghia dung: ${item.answer}` : "Chon nghia phu hop voi tu."}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="lesson-section">
        <div className="lesson-section-title">
          <h3>3. Mau cau lien quan</h3>
          <span className="tag">{lessonSentences.length} cau</span>
        </div>
        <div className="card-list">
          {lessonSentences.map((item) => (
            <article className="item-card" key={item.id}>
              <p className="meaning">{item.sentence}</p>
              <p className="example">{item.meaning}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lesson-section">
        <div className="lesson-section-title">
          <h3>4. Dien tu theo nghia</h3>
          <span className="tag">
            {fillScore}/{fillExercises.length}
          </span>
        </div>
        <div className="fill-list">
          {fillExercises.map((item) => (
            <article className="fill-card" key={item.id}>
              <p className="meaning">{item.prompt}</p>
              <p className="example">Nghia can chon: {item.meaning}</p>
              <div className="fill-options">
                {item.options.map((option) => {
                  const picked = answers[`fill-${lesson.id}-${item.id}`];
                  const className =
                    picked === option ? `topic-pill ${option === item.answer ? "correct-pill" : "wrong-pill"}` : "topic-pill";
                  return (
                    <button
                      className={className}
                      key={option}
                      onClick={() => onAnswer(`fill-${lesson.id}-${item.id}`, option)}
                      type="button"
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <p className="explain">
                {answers[`fill-${lesson.id}-${item.id}`] ? `Dap an dung: ${item.answer}` : "Chon tu phu hop voi nghia va ngu canh."}
              </p>
            </article>
          ))}
        </div>
      </section>

      {lesson.conversation ? (
        <section className="lesson-section">
          <div className="lesson-section-title">
            <h3>5. Hoi thoai ung dung</h3>
            <span className="tag">{lesson.conversation.topic}</span>
          </div>
          <div className="conversation">
            {lesson.conversation.lines.map((line) => (
              <div className="bubble" key={line}>
                {line}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {lesson.reading ? (
        <section className="lesson-section">
          <div className="lesson-section-title">
            <h3>6. Doan van on tu</h3>
            <span className="tag">{lesson.reading.wordCount} tu</span>
          </div>
          <article className="item-card">
            <h3 className="term">{lesson.reading.title}</h3>
            <p className="example">{lesson.reading.text}</p>
            <div className="term-cloud">
              {lesson.reading.targetTerms.slice(0, 10).map((term) => (
                <span className="tag" key={term}>
                  {term}
                </span>
              ))}
            </div>
          </article>
          {passageFill ? (
            <div className="passage-fill">
              <div className="lesson-section-title">
                <h3>Dien tu vao doan van</h3>
                <span className="tag">
                  {passageFillScore}/{passageFill.blanks.length}
                </span>
              </div>
              <article className="fill-card">
                <p className="meaning passage-cloze">{passageFill.text}</p>
                <div className="passage-blank-list">
                  {passageFill.blanks.map((blank) => (
                    <div className="passage-blank" key={blank.id}>
                      <p className="example">
                        Blank {blank.id}: {blank.meaning}
                      </p>
                      <div className="fill-options">
                        {blank.options.map((option) => {
                          const picked = answers[`passage-fill-${lesson.id}-${blank.id}`];
                          const className =
                            picked === option ? `topic-pill ${option === blank.answer ? "correct-pill" : "wrong-pill"}` : "topic-pill";
                          return (
                            <button
                              className={className}
                              key={option}
                              onClick={() => onAnswer(`passage-fill-${lesson.id}-${blank.id}`, option)}
                              type="button"
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="lesson-section">
        <div className="quiz-toolbar">
          <div>
            <h3>7. Quiz cua bai hoc</h3>
            <p>
              Diem hien tai: {quizScore}/{quiz.length}
            </p>
          </div>
          <button className="primary-action compact-action" onClick={onShuffleQuiz} type="button">
            Xao tron
          </button>
        </div>
        <div className="quiz-list personalized-quiz">
          {quiz.map((item) => (
            <QuizCard
              key={item.id}
              item={item}
              answer={answers[`lesson-${item.id}`]}
              onAnswer={(option) => onAnswer(`lesson-${item.id}`, option)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function TenseStudy({ grammar }: { grammar: Grammar[] }) {
  const tenseIds = new Set([
    "present-simple",
    "present-continuous",
    "past-simple",
    "past-continuous",
    "present-perfect",
    "past-perfect",
    "future-forms",
    "future-continuous"
  ]);
  const tenses = grammar.filter((item) => tenseIds.has(item.id));

  return (
    <div className="tense-grid">
      {tenses.map((item) => (
        <article className="item-card" key={item.id}>
          <div className="item-top">
            <h3 className="term">{item.title}</h3>
            <span className="tag">{item.signal}</span>
          </div>
          <p className="meaning">{item.form}</p>
          <p className="example">{item.use}</p>
          <p className="example">{item.toeicExample}</p>
        </article>
      ))}
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function renderMainContent({
  activeTab,
  data,
  vocabulary,
  learnedSet,
  activeTerms,
  learnedQuiz,
  learnedScore,
  lessons,
  completedLessonSet,
  answers,
  onToggleLearned,
  onCompleteLesson,
  onAnswer,
  onShuffleQuiz
}: {
  activeTab: Tab;
  data: ToeicData;
  vocabulary: Vocabulary[];
  learnedSet: Set<number>;
  activeTerms: string[];
  learnedQuiz: Quiz[];
  learnedScore: number;
  lessons: StudyLesson[];
  completedLessonSet: Set<number>;
  answers: Record<string, string>;
  onToggleLearned: (id: number) => void;
  onCompleteLesson: (lesson: StudyLesson) => void;
  onAnswer: (key: string, option: string) => void;
  onShuffleQuiz: () => void;
}) {
  if (activeTab === "vocabulary") {
    return (
      <div className="card-list">
        {vocabulary.map((item) => (
          <article className={`item-card ${learnedSet.has(item.id) ? "learned-card" : ""}`} key={item.id}>
            <div className="item-top">
              <h3 className="term">{item.term}</h3>
              <div className="card-actions">
                <span className="tag">{item.topic}</span>
                <button className="learn-toggle" onClick={() => onToggleLearned(item.id)} type="button">
                  {learnedSet.has(item.id) ? "Da hoc" : "Danh dau"}
                </button>
              </div>
            </div>
            <p className="meaning">{item.meaning}</p>
            {(item.examples ?? [item.example]).slice(0, 2).map((example) => (
              <p className="example" key={example}>
                {example}
              </p>
            ))}
          </article>
        ))}
      </div>
    );
  }

  if (activeTab === "grammar") {
    return (
      <div className="card-list">
        {data.grammar.map((item) => (
          <article className="item-card" key={item.id}>
            <div className="item-top">
              <h3 className="term">{item.title}</h3>
              <span className="tag">{item.signal}</span>
            </div>
            <p className="meaning">{item.form}</p>
            <p className="example">{item.use}</p>
            <p className="example">{item.toeicExample}</p>
          </article>
        ))}
      </div>
    );
  }

  if (activeTab === "sentences") {
    const allPatterns: SentencePattern[] =
      data.sentencePatterns ??
      data.sentences.map((sentence, index) => ({
        id: index + 1,
        topic: "general",
        sentence,
        meaning: "Mau cau TOEIC co ban."
      }));
    const patterns = activeTerms.length > 0 ? allPatterns.filter((item) => activeTerms.includes((item.term ?? "").toLowerCase())) : allPatterns;

    return (
      <div className="card-list">
        {patterns.length === 0 ? <div className="empty-state">Chua co mau cau lien ket voi nhom tu dang hoc.</div> : null}
        {patterns.map((item) => (
          <article className="item-card" key={item.id}>
            <div className="item-top">
              <p className="meaning">{item.sentence}</p>
              <span className="tag">{item.topic}</span>
            </div>
            <p className="example">{item.meaning}</p>
          </article>
        ))}
      </div>
    );
  }

  if (activeTab === "conversation") {
    const conversations = data.conversations
      .map((item) => {
        const text = item.lines.join(" ").toLowerCase();
        const matchedTerms = activeTerms.filter((term) => text.includes(term));
        return { ...item, matchedTerms };
      })
      .filter((item) => activeTerms.length === 0 || item.matchedTerms.length > 0);

    return (
      <div className="card-list">
        {conversations.length === 0 ? <div className="empty-state">Chua co hoi thoai dung cac tu dang hoc.</div> : null}
        {conversations.map((item) => (
          <article className="item-card" key={item.id}>
            <div className="item-top">
              <h3 className="term">{item.topic}</h3>
              <span className="tag">{item.matchedTerms.length > 0 ? `${item.matchedTerms.length} tu lien quan` : "speaking"}</span>
            </div>
            <div className="conversation">
              {item.lines.map((line) => (
                <div className="bubble" key={line}>
                  {line}
                </div>
              ))}
            </div>
            {item.matchedTerms.length > 0 ? (
              <div className="term-cloud">
                {item.matchedTerms.map((term) => (
                  <span className="tag" key={term}>
                    {term}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    );
  }

  if (activeTab === "reading") {
    const allPassages = data.readingPassages ?? [];
    const passages = allPassages
      .map((item) => {
        const matchedTerms = item.targetTerms.filter((term) => activeTerms.includes(term.toLowerCase()));
        return { ...item, matchedTerms };
      })
      .filter((item) => activeTerms.length === 0 || item.matchedTerms.length > 0);

    return (
      <div className="card-list">
        {passages.length === 0 ? <div className="empty-state">Chua co doan van dung cac tu dang hoc.</div> : null}
        {passages.map((item) => (
          <article className="item-card" key={item.id}>
            <div className="item-top">
              <h3 className="term">{item.title}</h3>
              <span className="tag">{item.matchedTerms.length > 0 ? `${item.matchedTerms.length} tu lien quan` : item.topic}</span>
            </div>
            <p className="example">{item.text}</p>
            <div className="term-cloud">
              {(item.matchedTerms.length > 0 ? item.matchedTerms : item.targetTerms).slice(0, 10).map((term) => (
                <span className="tag" key={term}>
                  {term}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (activeTab === "quiz") {
    return (
      <div className="card-list">
        <div className="quiz-toolbar">
          <div>
            <h3>Quiz theo tu da hoc</h3>
            <p>
              Diem hien tai: {learnedScore}/{learnedQuiz.length}
            </p>
          </div>
          <button className="primary-action compact-action" onClick={onShuffleQuiz} type="button">
            Xao tron
          </button>
        </div>
        {learnedQuiz.length > 0 ? (
          <div className="quiz-list personalized-quiz">
            {learnedQuiz.map((item) => (
              <QuizCard
                key={item.id}
                item={item}
                answer={answers[`learned-${item.id}`]}
                onAnswer={(option) => onAnswer(`learned-${item.id}`, option)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">Danh dau mot vai tu da hoc de tao quiz rieng cho ban.</div>
        )}
      </div>
    );
  }

  if (activeTab === "plan") {
    const completedCount = lessons.filter((lesson) => completedLessonSet.has(lesson.id)).length;

    return (
      <div className="card-list">
        <div className="plan-summary">
          <div>
            <h3>Lo trinh 28 ngay</h3>
            <p>
              Da hoan thanh {completedCount}/{lessons.length} bai. Moi bai gom tu vung, mau cau, doc hieu va lien ket hoi thoai.
            </p>
          </div>
          <span className="tag">{Math.round((completedCount / lessons.length) * 100)}%</span>
        </div>
        <div className="lesson-grid">
          {lessons.map((lesson) => {
            const done = completedLessonSet.has(lesson.id);
            return (
              <article className={`item-card lesson-card ${done ? "learned-card" : ""}`} key={lesson.id}>
                <div className="item-top">
                  <div>
                    <p className="eyebrow lesson-day">Ngay {lesson.id}</p>
                    <h3 className="term">{lesson.title}</h3>
                  </div>
                  <span className="tag">{done ? "Hoan thanh" : lesson.focus}</span>
                </div>
                <p className="example">{lesson.tasks.join(" ")}</p>
                <div className="term-cloud">
                  {lesson.vocabulary.slice(0, 8).map((item) => (
                    <span className="tag" key={item.id}>
                      {item.term}
                    </span>
                  ))}
                </div>
                {lesson.reading ? <p className="example">Doc: {lesson.reading.title}</p> : null}
                {lesson.conversation ? <p className="example">Hoi thoai: {lesson.conversation.topic}</p> : null}
                <button className="learn-toggle lesson-action" onClick={() => onCompleteLesson(lesson)} type="button">
                  {done ? "Da luu tien do" : "Hoan thanh bai nay"}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="card-list">
      {data.studyPlan.map((item, index) => (
        <article className="item-card" key={item}>
          <div className="item-top">
            <h3 className="term">Buoc {index + 1}</h3>
            <span className="tag">14 ngay</span>
          </div>
          <p className="example">{item}</p>
        </article>
      ))}
    </div>
  );
}

function QuizCard({
  item,
  answer,
  onAnswer
}: {
  item: Quiz;
  answer?: string;
  onAnswer: (option: string) => void;
}) {
  return (
    <article className="quiz-card">
      <h3>{item.question}</h3>
      <div className="options">
        {item.options.map((option) => {
          const isPicked = answer === option;
          const className = answer && isPicked ? `option ${option === item.answer ? "correct" : "wrong"}` : "option";
          return (
            <button className={className} key={option} onClick={() => onAnswer(option)} type="button">
              {option}
            </button>
          );
        })}
      </div>
      <p className="explain">{answer ? item.explanation : "Chon mot dap an de xem giai thich."}</p>
    </article>
  );
}

function buildLearnedQuiz(learnedVocabulary: Vocabulary[], allVocabulary: Vocabulary[], seed: number): Quiz[] {
  return shuffleItems(learnedVocabulary, seed)
    .slice(0, 24)
    .map((item, index) => {
      const wrongOptions = shuffleItems(
        allVocabulary.filter((candidate) => candidate.id !== item.id),
        seed + item.id
      )
        .slice(0, 3)
        .map((candidate) => candidate.meaning);
      const options = shuffleItems([item.meaning, ...wrongOptions], seed + index);

      return {
        id: item.id,
        question: `Tu "${item.term}" co nghia la gi?`,
        options,
        answer: item.meaning,
        explanation: `${item.term}: ${item.meaning}. Vi du: ${(item.examples ?? [item.example])[0]}`
      };
    });
}

function buildMeaningExercises(vocabulary: Vocabulary[]): MeaningExercise[] {
  return vocabulary.slice(0, 10).map((item, index) => {
    const wrongOptions = vocabulary
      .filter((candidate) => candidate.id !== item.id)
      .slice(index, index + 3)
      .map((candidate) => candidate.meaning);

    return {
      id: item.id,
      term: item.term,
      answer: item.meaning,
      options: shuffleItems([item.meaning, ...wrongOptions], item.id + index)
    };
  });
}

function buildFillExercises(vocabulary: Vocabulary[]): FillExercise[] {
  return vocabulary.slice(0, 10).map((item, index) => {
    const source = (item.examples ?? [item.example])[0] ?? item.example;
    const escaped = item.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prompt = source.replace(new RegExp(escaped, "i"), "______");
    const options = shuffleItems(
      [item.term, ...vocabulary.filter((candidate) => candidate.id !== item.id).slice(index, index + 3).map((candidate) => candidate.term)],
      item.id + index
    );

    return {
      id: item.id,
      prompt: prompt === source ? `${source} (${item.meaning}: ______)` : prompt,
      meaning: item.meaning,
      answer: item.term,
      options
    };
  });
}

function buildPassageFillExercise(reading: ReadingPassage, vocabulary: Vocabulary[]): PassageFillExercise | null {
  const blanks: PassageBlank[] = [];
  let text = reading.text;
  const terms = reading.targetTerms
    .map((term) => vocabulary.find((item) => item.term.toLowerCase() === term.toLowerCase()))
    .filter((item): item is Vocabulary => Boolean(item))
    .slice(0, 6);

  terms.forEach((item, index) => {
    const escaped = item.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`\\b${escaped}\\b`, "i");
    if (!pattern.test(text)) return;

    const blankId = blanks.length + 1;
    text = text.replace(pattern, `____(${blankId})____`);
    blanks.push({
      id: blankId,
      answer: item.term,
      meaning: item.meaning,
      options: shuffleItems(
        [item.term, ...vocabulary.filter((candidate) => candidate.id !== item.id).slice(index, index + 4).map((candidate) => candidate.term)].slice(0, 4),
        item.id + blankId
      )
    });
  });

  if (blanks.length === 0) return null;
  return { text, blanks };
}

function buildStudyLessons(data: ToeicData): StudyLesson[] {
  const wordsPerLesson = 12;
  const lessonCount = Math.ceil(data.vocabulary.length / wordsPerLesson);
  const readings = data.readingPassages ?? [];

  return Array.from({ length: lessonCount }, (_, index) => {
    const vocabulary = data.vocabulary.slice(index * wordsPerLesson, index * wordsPerLesson + wordsPerLesson);
    const topic = vocabulary[0]?.topic ?? "general";
    const reading = readings.find((item) => item.topic === topic) ?? readings[index % Math.max(readings.length, 1)];
    const topicTerms = vocabulary.map((item) => item.term.toLowerCase());
    const conversation =
      data.conversations.find((item) => topicTerms.some((term) => item.lines.join(" ").toLowerCase().includes(term))) ??
      data.conversations[index % data.conversations.length];

    return {
      id: index + 1,
      title: topic.replace(/-/g, " "),
      focus: index < 14 ? "Nen tang" : index < 42 ? "Ung dung" : "On tap",
      topics: [topic],
      vocabulary,
      reading,
      conversation,
      tasks: [
        `Hoc ${vocabulary.length} tu va danh dau da hoc.`,
        "Doc 2 cau vi du cho moi tu.",
        "Doc doan van lien quan va lam quiz ca nhan hoa."
      ]
    };
  });
}

function shuffleItems<T>(items: T[], seed: number): T[] {
  return [...items]
    .map((item, index) => {
      const sortKey = Math.sin((index + 1) * 999 + seed * 131) * 10000;
      return { item, sortKey: sortKey - Math.floor(sortKey) };
    })
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ item }) => item);
}
