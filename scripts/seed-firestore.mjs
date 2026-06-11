import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, writeBatch } from "firebase/firestore";
import data from "../data/toeic-starter.json" with { type: "json" };

const firebaseConfig = {
  apiKey: "AIzaSyBGZZSLnlW7R6ysf9BlaQRoOA09ePCJlqg",
  authDomain: "english-app-86322.firebaseapp.com",
  projectId: "english-app-86322",
  storageBucket: "english-app-86322.firebasestorage.app",
  messagingSenderId: "261144511792",
  appId: "1:261144511792:web:d7c889b4185fd58ec534f5",
  measurementId: "G-KS0WDN4XY7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const collections = {
  vocabulary: data.vocabulary,
  grammar: data.grammar,
  sentencePatterns: data.sentencePatterns,
  conversations: data.conversations,
  readingPassages: data.readingPassages,
  quiz: data.quiz
};

await setDoc(doc(db, "toeic", "starter"), {
  sources: data.sources,
  stats: data.stats,
  studyPlan: data.studyPlan,
  updatedAt: new Date().toISOString()
});

for (const [name, items] of Object.entries(collections)) {
  await writeCollection(name, items);
}

console.log("Seeded TOEIC data to Firestore: toeic/starter");

async function writeCollection(name, items) {
  for (let start = 0; start < items.length; start += 450) {
    const batch = writeBatch(db);
    for (const item of items.slice(start, start + 450)) {
      batch.set(doc(db, "toeic", "starter", name, String(item.id)), item);
    }
    await batch.commit();
  }
}
