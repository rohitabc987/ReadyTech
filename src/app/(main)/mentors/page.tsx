
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
                <CardHeader className="items-center text-center p-6">
                     <Avatar className="h-20 w-20 mb-3">
                        <AvatarImage src={user.personal.avatarUrl} alt={user.personal.name} />
                        <AvatarFallback className="text-3xl">{userInitials}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-lg">{user.personal.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span>{user.academics.institution}</span>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground text-center flex-1 line-clamp-3">{user.personal.bio}</p>
                    <Button 
                        variant="default"
                        size="sm" 
                        className="w-full mt-4" 
                        onClick={handleConnect}>
                        <MessageSquare className="mr-2 h-4 w-4"/>Connect
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
    <main className="flex-1">
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {mentors.map(mentor => (
                  <MentorCard key={mentor.id} user={mentor} />
              ))}
          </div>
    </main>
  );
}
