import FirebaseDataProvider from "@/components/FirebaseDataProvider";
import db from "@/data/toeic-starter.json";

export default function ToeicBasicPage() {
  return <FirebaseDataProvider initialData={db} />;
}
