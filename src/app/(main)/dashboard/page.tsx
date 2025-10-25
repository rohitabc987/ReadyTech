
'use client';

import { getPosts } from '@/lib/firebase/posts';
import { DashboardFilter, type FilterState } from '@/components/dashboard-filter';
import { PostCard, type EnrichedPost } from '@/components/post-card';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';


// Renaming the component to indicate it's a client component
function DashboardClient({ initialPosts }: { initialPosts: EnrichedPost[] }) {
  const { user: currentUser } = useAuth();
  
  const [allPosts, setAllPosts] = useState<EnrichedPost[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState<EnrichedPost[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false); // No initial loading
  const [filters, setFilters] = useState<FilterState>({
    type: '',
    company: '',
    role: '',
    year: '',
    college: '',
  });

  // When initialPosts change (e.g. on navigation), reset the state
  useEffect(() => {
    setAllPosts(initialPosts);
    setFilteredPosts(initialPosts);
  }, [initialPosts]);


  const handleApplyFilters = () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };
  
  const handleClearFilters = () => {
    setFilters({ type: '', company: '', role: '', year: '', college: '' });
    setFilteredPosts(allPosts);
  }

  const PostSkeletons = () => (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-full h-[220px] rounded-lg" />
      <Skeleton className="w-full h-[220px] rounded-lg" />
      <Skeleton className="w-full h-[220px] rounded-lg" />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8">
      {/* Filters */}
      <aside className="hidden md:block md:col-span-1 md:sticky md:top-20 self-start">
        <DashboardFilter 
          filters={filters}
          onFilterChange={setFilters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </aside>

      {/* Posts */}
      <div className="md:col-span-3">
        {/* Mobile View */}
        <div className="block md:hidden  flex flex-col gap-2">
            <DashboardFilter 
              filters={filters}
              onFilterChange={setFilters}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
            />
            {isLoading ? <PostSkeletons /> : filteredPosts.length > 0 ? (
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

        {/* Desktop View */}
        <div className="hidden md:flex flex-col gap-4">
          {isLoading ? <PostSkeletons /> : filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} currentUser={currentUser} />
              ))
          ) : (
            <div className="text-center py-12 text-muted-foreground bg-card rounded-lg border">
              <h3 className="text-lg font-semibold">No posts found</h3>
              <p>Try adjusting your filters or clearing them to see all posts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// The main page component is now a Server Component
export default async function DashboardPage() {
  const initialPosts = await getPosts();
  return <DashboardClient initialPosts={initialPosts} />;
}
