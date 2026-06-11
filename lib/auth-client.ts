import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export function normalizeUsername(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
}

export function usernameToEmail(value: string) {
  return `${value}@english-app.local`;
}

export async function loginWithUsername(username: string, password: string) {
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername) throw new Error("invalid-username");

  const credential = await signInWithEmailAndPassword(auth, usernameToEmail(normalizedUsername), password);
  return credential.user;
}

export async function registerWithUsername(username: string, password: string) {
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername) throw new Error("invalid-username");

  const credential = await createUserWithEmailAndPassword(auth, usernameToEmail(normalizedUsername), password);
  await updateProfile(credential.user, { displayName: normalizedUsername });
  await setDoc(
    doc(db, "users", credential.user.uid),
    {
      username: normalizedUsername,
      createdAt: new Date().toISOString()
    },
    { merge: true }
  );

  return credential.user;
}

export function getAuthMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  const code = typeof error === "object" && error && "code" in error ? String((error as { code: unknown }).code) : "";

  if (message === "invalid-username") {
    return "Username chi nen gom chu cai, so, dau cham, gach ngang hoac gach duoi.";
  }
  if (code.includes("email-already-in-use")) return "Username nay da duoc dang ky.";
  if (code.includes("invalid-credential") || code.includes("user-not-found") || code.includes("wrong-password")) {
    return "Sai username hoac password.";
  }
  if (code.includes("weak-password")) return "Password can it nhat 6 ky tu.";
  if (code.includes("operation-not-allowed")) return "Hay bat Email/Password trong Firebase Authentication.";
  if (code.includes("permission-denied")) return "Firebase rules chua cho phep luu thong tin user.";
  return "Khong the dang nhap/dang ky luc nay.";
}
