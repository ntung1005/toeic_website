import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGZZSLnlW7R6ysf9BlaQRoOA09ePCJlqg",
  authDomain: "english-app-86322.firebaseapp.com",
  projectId: "english-app-86322",
  storageBucket: "english-app-86322.firebasestorage.app",
  messagingSenderId: "261144511792",
  appId: "1:261144511792:web:d7c889b4185fd58ec534f5",
  measurementId: "G-KS0WDN4XY7"
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  return (await isSupported()) ? getAnalytics(firebaseApp) : null;
}
