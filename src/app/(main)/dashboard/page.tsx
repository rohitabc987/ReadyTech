
'use client';

import { useEffect, useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { getPosts } from '@/lib/firebase/posts';
import { DashboardFilter } from '@/components/dashboard-filter';
import { PostCard, type EnrichedPost } from '@/components/post-card';
import { useAuth } from '@/context/auth-context';


export default function DashboardPage() {
  const [posts, setPosts] = useState<EnrichedPost[]>([]);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await getPosts();
      setPosts(allPosts);
    };
    loadPosts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <DashboardFilter />
        </aside>
        <div className="lg:col-span-3">
                <CardContent className="grid gap-4">
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} currentUser={currentUser} />
                    ))}
                </CardContent>
        </div>
      </div>
    </>
  );
}
