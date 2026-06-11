"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import StudyApp from "@/components/StudyApp";
import { auth, db, getFirebaseAnalytics } from "@/lib/firebase";

type FirebaseDataProviderProps = {
  initialData: React.ComponentProps<typeof StudyApp>["initialData"];
};

export default function FirebaseDataProvider({ initialData }: FirebaseDataProviderProps) {
  const [data, setData] = useState(initialData);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    getFirebaseAnalytics().catch(() => null);

    loadToeicData(initialData)
      .then(setData)
      .catch(() => {
        setData(initialData);
      });
  }, [initialData]);

  return (
    <>
      <div className="auth-bar">
        {user ? (
          <div className="auth-card auth-signed-in">
            <div className="auth-avatar" aria-hidden="true">
              {(user.displayName ?? user.email ?? "U").slice(0, 1).toUpperCase()}
            </div>
            <div className="auth-copy">
              <strong>{user.displayName ?? user.email?.split("@")[0]}</strong>
              <span>Tiến độ đang được lưu trên Firebase</span>
            </div>
            <Link className="auth-submit secondary" href="/logout">
              Đăng xuất
            </Link>
          </div>
        ) : (
          <div className="auth-card auth-guest">
            <div className="auth-copy">
              <strong>Học TOEIC theo tài khoản riêng</strong>
              <span>Lưu tiến độ học theo tài khoản của bạn</span>
            </div>
            <div className="auth-actions">
              <Link className="auth-submit secondary" href="/login">
                Đăng nhập
              </Link>
              <Link className="auth-submit" href="/register">
                Đăng ký
              </Link>
            </div>
          </div>
        )}
      </div>
      <StudyApp initialData={data} userId={user?.uid ?? null} username={user?.displayName ?? null} />
    </>
  );
}

async function loadToeicData(fallback: FirebaseDataProviderProps["initialData"]) {
  const metaSnapshot = await getDoc(doc(db, "toeic", "starter"));
  if (!metaSnapshot.exists()) return fallback;

  const [vocabulary, grammar, sentencePatterns, conversations, readingPassages, quiz] = await Promise.all([
    readCollection("vocabulary"),
    readCollection("grammar"),
    readCollection("sentencePatterns"),
    readCollection("conversations"),
    readCollection("readingPassages"),
    readCollection("quiz")
  ]);

  if (vocabulary.length === 0) {
    return metaSnapshot.data() as FirebaseDataProviderProps["initialData"];
  }

  return {
    ...fallback,
    ...metaSnapshot.data(),
    vocabulary,
    grammar,
    sentencePatterns,
    sentences: sentencePatterns.map((item) => item.sentence),
    conversations,
    readingPassages,
    quiz
  } as FirebaseDataProviderProps["initialData"];
}

async function readCollection(name: string) {
  const snapshot = await getDocs(query(collection(db, "toeic", "starter", name), orderBy("id", "asc")));
  return snapshot.docs.map((item) => item.data() as any);
}
