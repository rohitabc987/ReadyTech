
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getPosts } from '@/lib/firebase/posts';
import { DashboardFilter } from '@/components/dashboard-filter';
import { PostCard, type EnrichedPost } from '@/components/post-card';


export default function DashboardPage() {
  const [posts, setPosts] = useState<EnrichedPost[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const allPosts = await getPosts();
      setPosts(allPosts);
    };
    loadData();
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
                      <PostCard key={post.id} post={post} />
                    ))}
                </CardContent>
        </div>
      </div>
    </>
  );
}
