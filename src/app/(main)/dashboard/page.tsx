
import { getPosts } from '@/lib/firebase/posts';
import type { EnrichedPost } from '@/components/post-card';
import DashboardClient from './dashboard-client';

// ✅ Server Component
export default async function DashboardPage() {
  const initialPosts: EnrichedPost[] = await getPosts();
  return <DashboardClient initialPosts={initialPosts} />;
}
