
import { getMentors } from '@/lib/firebase/users';
import MentorsClient from './mentors-client';

export default async function MentorsPage() {
  const initialMentors = await getMentors();
  return <MentorsClient initialMentors={initialMentors} />;
}
