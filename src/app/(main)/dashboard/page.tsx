
'use client';

import { useEffect, useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { getPosts } from '@/lib/firebase/posts';
import { DashboardFilter, type FilterState } from '@/components/dashboard-filter';
import { PostCard, type EnrichedPost } from '@/components/post-card';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

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
    if (filters.year) {
      postsToFilter = postsToFilter.filter(post => {
        // Ensure createdAt is a Date object before calling getFullYear
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

  const areFiltersActive = Object.values(filters).some(value => value !== '');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1 lg:sticky lg:top-20 self-start">
        <DashboardFilter 
          filters={filters}
          onFilterChange={setFilters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </aside>
      <div className="lg:col-span-3 grid gap-4">
        {areFiltersActive && (
            <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg border">
                <p className="text-sm font-medium text-muted-foreground">
                    Filters are active.
                </p>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleClearFilters}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Clear All
                </Button>
            </div>
        )}
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} currentUser={currentUser} />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground bg-card rounded-lg">
              <h3 className="text-lg font-semibold">No posts found</h3>
              <p>Try adjusting your filters or clearing them to see all posts.</p>
            </div>
          )}
      </div>
    </div>
  );
}
