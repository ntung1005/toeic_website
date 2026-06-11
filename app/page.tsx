import FirebaseDataProvider from "@/components/FirebaseDataProvider";
import db from "@/data/toeic-starter.json";

export default function Home() {
  return <FirebaseDataProvider initialData={db} />;
}
