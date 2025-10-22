
'use client';

import { useEffect, useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { getPosts } from '@/lib/firebase/posts';
import { DashboardFilter, type FilterState } from '@/components/dashboard-filter';
import { PostCard, type EnrichedPost } from '@/components/post-card';
import { useAuth } from '@/context/auth-context';

export default function DashboardPage() {
  const { user: currentUser } = useAuth();
  
  const [allPosts, setAllPosts] = useState<EnrichedPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<EnrichedPost[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    type: '',
    company: '',
    role: '',
    year: '',
    college: '',
  });

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await getPosts();
      setAllPosts(posts);
      setFilteredPosts(posts);
    };
    loadPosts();
  }, []);

  const handleApplyFilters = () => {
    let postsToFilter = [...allPosts];

    if (filters.type && filters.type !== 'all') {
      postsToFilter = postsToFilter.filter(post => post.main.type.toLowerCase().replace(/ /g, '-') === filters.type);
    }
    if (filters.company) {
      postsToFilter = postsToFilter.filter(post => post.main.company?.toLowerCase() === filters.company.toLowerCase());
    }
    if (filters.role) {
      postsToFilter = postsToFilter.filter(post => post.main.role?.toLowerCase() === filters.role.toLowerCase());
    }
    // Note: Year and College filtering would require that data on the post object.
    // This is a placeholder for when that data is available.
    if (filters.year) {
        // Example: postsToFilter = postsToFilter.filter(post => new Date(post.main.createdAt).getFullYear().toString() === filters.year);
    }
    if (filters.college) {
        // Example: postsToFilter = postsToFilter.filter(post => post.author.academics.institution.toLowerCase().includes(filters.college.toLowerCase()));
    }

    setFilteredPosts(postsToFilter);
  };
  
  const handleClearFilters = () => {
    setFilters({ type: '', company: '', role: '', year: '', college: '' });
    setFilteredPosts(allPosts);
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <DashboardFilter 
            filters={filters}
            onFilterChange={setFilters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
        </aside>
        <div className="lg:col-span-3">
            <CardContent className="grid gap-4">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} currentUser={currentUser} />
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <h3 className="text-lg font-semibold">No posts found</h3>
                    <p>Try adjusting your filters or clearing them to see all posts.</p>
                  </div>
                )}
            </CardContent>
        </div>
      </div>
    </>
  );
}
