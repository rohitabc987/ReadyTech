
import { getAllQuestions } from '@/lib/firebase/questions';
import QuestionsClient from './questions-client';

export default async function QuestionsPage() {
  const initialQuestions = await getAllQuestions();
  return <QuestionsClient initialQuestions={initialQuestions} />;
}
