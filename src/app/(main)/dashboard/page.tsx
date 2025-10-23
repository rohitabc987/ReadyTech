
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getPosts } from '@/lib/firebase/posts';
import { DashboardFilter, type FilterState } from '@/components/dashboard-filter';
import { PostCard, type EnrichedPost } from '@/components/post-card';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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

  const isMobile = useIsMobile();

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
    if (filters.year) {
      postsToFilter = postsToFilter.filter(post => {
        const postDate = new Date(post.main.createdAt);
        return postDate.getFullYear().toString() === filters.year;
      });
    }
    if (filters.college) {
        postsToFilter = postsToFilter.filter(post => 
            post.main.institution?.toLowerCase().includes(filters.college.toLowerCase())
        );
    }

    setFilteredPosts(postsToFilter);
  };
  
  const handleClearFilters = () => {
    setFilters({ type: '', company: '', role: '', year: '', college: '' });
    setFilteredPosts(allPosts);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-6">
      {/* Filters */}
      <aside className="lg:col-span-1 lg:sticky lg:top-20 self-start mb-4 lg:mb-0">
        <DashboardFilter 
          filters={filters}
          onFilterChange={setFilters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </aside>

      {/* Posts */}
      <div className="lg:col-span-3">
        {/* Mobile View */}
        <div className="block md:hidden bg-card">
          {filteredPosts.length > 0 ? (
            <div className="flex flex-col">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className={index < filteredPosts.length - 1 ? 'border-b' : ''}>
                    <PostCard post={post} currentUser={currentUser} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <h3 className="text-lg font-semibold">No posts found</h3>
              <p>Try adjusting your filters or clearing them to see all posts.</p>
            </div>
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block bg-card rounded-lg border shadow-sm">
          {filteredPosts.length > 0 ? (
            <div className="flex flex-col">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className={index < filteredPosts.length - 1 ? 'border-b' : ''}>
                    <PostCard post={post} currentUser={currentUser} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground rounded-lg">
              <h3 className="text-lg font-semibold">No posts found</h3>
              <p>Try adjusting your filters or clearing them to see all posts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
