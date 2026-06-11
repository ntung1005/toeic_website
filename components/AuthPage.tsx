"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAuthMessage, loginWithUsername, registerWithUsername } from "@/lib/auth-client";

type AuthPageProps = {
  mode: "login" | "register";
};

export default function AuthPage({ mode }: AuthPageProps) {
  const router = useRouter();
  const isRegister = mode === "register";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      if (isRegister) {
        await registerWithUsername(username, password);
      } else {
        await loginWithUsername(username, password);
      }
      router.push("/");
    } catch (authError) {
      setError(getAuthMessage(authError));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="auth-title">
        <Link className="auth-home-link" href="/">
          TOEIC Starter
        </Link>
        <p className="eyebrow">Tai khoan hoc tap</p>
        <h1 id="auth-title">{isRegister ? "Tạo tài khoản mới" : "Đăng nhập"}</h1>
        <p className="auth-page-copy">
          {isRegister
            ? "Tạo username/password để lưu tiến độ, từ đã học và bài quiz của riêng bạn."
            : "Quay lại lộ trình học cá nhân, tiếp tục từ vựng và bài tập bạn đang luyện."}
        </p>

        <form className="auth-page-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Username</span>
            <input
              autoComplete="username"
              autoFocus
              onChange={(event) => setUsername(event.target.value)}
              placeholder="vd: tungnguyen"
              required
              value={username}
            />
          </label>
          <label className="auth-field">
            <span>Password</span>
            <input
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Tối thiểu 6 ký tự"
              required
              type="password"
              value={password}
            />
          </label>
          {error ? <p className="auth-error">{error}</p> : null}
          <button className="auth-submit auth-page-submit" disabled={busy} type="submit">
            {busy ? "Đang xử lý..." : isRegister ? "Tạo tài khoản" : "Đăng nhập"}
          </button>
        </form>

        <div className="auth-page-actions">
          <span>{isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}</span>
          <Link href={isRegister ? "/login" : "/register"}>{isRegister ? "Đăng nhập" : "Đăng ký"}</Link>
        </div>
      </section>
    </main>
  );
}
