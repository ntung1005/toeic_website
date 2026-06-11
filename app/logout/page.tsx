"use client";

import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut(auth).finally(() => {
      router.replace("/login");
    });
  }, [router]);

  return (
    <main className="auth-page">
      <section className="auth-panel auth-logout-panel" aria-labelledby="logout-title">
        <Link className="auth-home-link" href="/">
          TOEIC Starter
        </Link>
        <p className="eyebrow">Tai khoan hoc tap</p>
        <h1 id="logout-title">Đang đăng xuất</h1>
        <p className="auth-page-copy">Tiến độ của bạn đã được đồng bộ theo tài khoản Firebase.</p>
        <Link className="auth-submit auth-page-submit" href="/login">
          Về trang đăng nhập
        </Link>
      </section>
    </main>
  );
}
