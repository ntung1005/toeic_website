"use client";

import { signOut } from "firebase/auth";
import { waitForPendingWrites } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth, db } from "@/lib/firebase";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    let active = true;

    async function logoutAfterSync() {
      await waitForPendingWrites(db).catch(() => undefined);
      await signOut(auth);
      if (active) router.replace("/login");
    }

    logoutAfterSync().catch(() => {
      if (active) router.replace("/login");
    });

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <main className="auth-page">
      <section className="auth-panel auth-logout-panel" aria-labelledby="logout-title">
        <Link className="auth-home-link" href="/">
          TOEIC Starter
        </Link>
        <p className="eyebrow">Tai khoan hoc tap</p>
        <h1 id="logout-title">Đang đăng xuất</h1>
        <p className="auth-page-copy">Đang đồng bộ tiến độ lên Firebase trước khi đăng xuất.</p>
        <Link className="auth-submit auth-page-submit" href="/login">
          Về trang đăng nhập
        </Link>
      </section>
    </main>
  );
}
