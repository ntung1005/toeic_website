import StudyApp from "@/components/StudyApp";
import db from "@/data/toeic-starter.json";

export default function Home() {
  return <StudyApp initialData={db} />;
}
