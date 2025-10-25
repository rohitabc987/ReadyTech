
'use client';

import type { User } from '@/lib/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UserProfileCard } from '@/components/user-profile-card';
import { useAuth } from '@/context/auth-context';

function MentorCard({ user }: { user: User }) {
    const { user: currentUser } = useAuth();
    const isOwnProfile = currentUser?.id === user.id;

    return (
        <Link href={`/users/${user.id}`} className="block h-full">
             <div className="h-full flex flex-col hover:bg-muted/50 transition-colors rounded-lg">
                <UserProfileCard user={user} isOwnProfile={isOwnProfile} isCompact={true} className="border"/>
            </div>
        </Link>
    )
}

export default function MentorsClient({ initialMentors }: { initialMentors: User[] }) {
    const [mentors, setMentors] = useState<User[]>(initialMentors);

    useEffect(() => {
        setMentors(initialMentors);
    }, [initialMentors]);


  return (
    <main className="flex-1 bg-mobile-background md:bg-transparent">
          <div className="grid gap-2 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 p-2 md:p-0">
              {mentors.map(mentor => (
                  <MentorCard key={mentor.id} user={mentor} />
              ))}
          </div>
    </main>
  );
}
