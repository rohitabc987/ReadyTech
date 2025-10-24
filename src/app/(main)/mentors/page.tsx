
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMentors } from '@/lib/firebase/users';
import type { User } from '@/lib/types';
import { GraduationCap, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function MentorCard({ user }: { user: User }) {
    const userInitials = user.personal.name.split(' ').map(n => n[0]).join('');

    const handleConnect = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Connect with " + user.id);
        // Here you would implement the logic to connect with the mentor,
        // for example, opening a chat modal or sending a connection request.
    };

    return (
        <Link href={`/users/${user.id}`} className="block">
            <Card className="h-full flex flex-col hover:bg-muted/50 transition-colors">
                <CardHeader className="items-center text-center p-4 md:p-6">
                     <Avatar className="h-16 w-16 md:h-20 md:w-20 mb-2">
                        <AvatarImage src={user.personal.avatarUrl} alt={user.personal.name} />
                        <AvatarFallback className="text-xl md:text-2xl">{userInitials}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-base md:text-lg">{user.personal.name}</CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <GraduationCap className="h-3 w-3" />
                        <span>{user.academics.institution}</span>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 md:p-6 md:pt-0 flex-1 flex flex-col">
                    <p className="text-xs md:text-sm text-muted-foreground text-center flex-1 line-clamp-2">{user.personal.bio}</p>
                    <Button 
                        variant="default"
                        size="sm" 
                        className="w-auto mt-3 text-xs mx-2 md:text-sm md:mx-4" 
                        onClick={handleConnect}>
                        <MessageSquare className="mr-1.5 h-3 w-3 md:h-4 md:w-4"/>Connect
                    </Button>
                </CardContent>
            </Card>
        </Link>
    )
}

export default function MentorsPage() {
    const [mentors, setMentors] = useState<User[]>([]);

    useEffect(() => {
      const fetchMentors = async () => {
        const mentorData = await getMentors();
        setMentors(mentorData);
      };
      fetchMentors();
    }, []);


  return (
    <main className="flex-1 mt-4">
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {mentors.map(mentor => (
                  <MentorCard key={mentor.id} user={mentor} />
              ))}
          </div>
    </main>
  );
}
