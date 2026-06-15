"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

type Course = {
  id: string;
  title: string;
  level: string;
  status: "available" | "soon";
  description: string;
  href: string;
  lessons: string;
  skills: string[];
};

const courses: Course[] = [
  {
    id: "toeic-basic",
    title: "TOEIC Basic",
    level: "Beginner",
    status: "available",
    description: "Lo trinh TOEIC tu con so 0 voi 600+ tu vung, ngu phap, hoi thoai, doan doc va bai tap moi ngay.",
    href: "/courses/toeic-basic",
    lessons: "57 ngay",
    skills: ["Vocabulary", "Grammar", "Listening", "Reading", "Quiz"]
  },
  {
    id: "toeic-advance",
    title: "TOEIC Advance",
    level: "Intermediate - Advanced",
    status: "soon",
    description: "Luyen Part 5-7 nang cao, chien luoc doc nhanh, paraphrase, collocation va de mock test theo muc tieu diem.",
    href: "#",
    lessons: "Sap ra mat",
    skills: ["Part 5", "Part 6", "Part 7", "Mock test"]
  },
  {
    id: "ielts-foundation",
    title: "IELTS Foundation",
    level: "Beginner - Band 4.5",
    status: "soon",
    description: "Xay nen tang IELTS voi tu vung academic, grammar, reading skills, listening skills va writing task co ban.",
    href: "#",
    lessons: "Sap ra mat",
    skills: ["Listening", "Reading", "Writing", "Speaking"]
  },
  {
    id: "ielts-intensive",
    title: "IELTS Intensive",
    level: "Band 5.5 - 7.0",
    status: "soon",
    description: "Khoa nang diem IELTS voi topic vocabulary, essay planning, speaking frameworks va practice test theo band.",
    href: "#",
    lessons: "Sap ra mat",
    skills: ["Essay", "Speaking", "Academic words", "Practice test"]
  }
];

export default function CourseCatalog() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);

      if (!currentUser) {
        router.replace("/login");
      }
    });
  }, [router]);

  if (!authChecked) {
    return <CatalogGate message="Đang kiểm tra đăng nhập..." />;
  }

  if (!user) {
    return <CatalogGate message="Đang chuyển tới trang đăng nhập..." />;
  }

  return (
    <main className="catalog-shell">
      <div className="auth-bar">
        <div className="auth-card auth-signed-in">
          <div className="auth-avatar" aria-hidden="true">
            {(user.displayName ?? user.email ?? "U").slice(0, 1).toUpperCase()}
          </div>
          <div className="auth-copy">
            <strong>{user.displayName ?? user.email?.split("@")[0]}</strong>
            <span>Chọn khóa học để tiếp tục tiến độ của bạn</span>
          </div>
          <Link className="auth-submit secondary" href="/logout">
            Đăng xuất
          </Link>
        </div>
      </div>

      <section className="catalog-hero">
        <p className="eyebrow">English Learning Hub</p>
        <h1>Chọn khóa học phù hợp với mục tiêu của bạn</h1>
        <p>
          Mỗi khóa học sẽ có lộ trình, bài tập và tiến độ riêng theo tài khoản Firebase. TOEIC Basic đang sẵn sàng để học ngay.
        </p>
      </section>

      <section className="course-grid" aria-label="Danh sach khoa hoc">
        {courses.map((course) => (
          <article className={`course-card ${course.status === "soon" ? "course-soon" : ""}`} key={course.id}>
            <div className="item-top">
              <div>
                <p className="eyebrow">{course.level}</p>
                <h2>{course.title}</h2>
              </div>
              <span className={`tag ${course.status === "available" ? "official-tag" : ""}`}>
                {course.status === "available" ? "Dang hoc" : "Sap ra mat"}
              </span>
            </div>
            <p className="example">{course.description}</p>
            <div className="course-meta">
              <span>{course.lessons}</span>
              <span>{course.skills.length} nhom ky nang</span>
            </div>
            <div className="term-cloud">
              {course.skills.map((skill) => (
                <span className="tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
            {course.status === "available" ? (
              <Link className="primary-action course-action" href={course.href}>
                Vao hoc
              </Link>
            ) : (
              <button className="primary-action course-action" disabled type="button">
                Sap ra mat
              </button>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}

function CatalogGate({ message }: { message: string }) {
  return (
    <main className="auth-page">
      <section className="auth-panel auth-gate-panel" aria-live="polite">
        <p className="eyebrow">English Learning Hub</p>
        <h1>Đang tải</h1>
        <p className="auth-page-copy">{message}</p>
      </section>
    </main>
  );
}
