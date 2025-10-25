
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { User } from '@/lib/types';
import { GraduationCap, MessageSquare, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

function MentorCard({ user }: { user: User }) {
    const { toast } = useToast();
    const userInitials = user.personal.name.split(' ').map(n => n[0]).join('');
    const [isRequested, setIsRequested] = useState(false);

    const handleConnect = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // In a real app, this would trigger a Firestore write.
        // For now, we'll simulate it with state.
        setIsRequested(true);

        toast({
            title: 'Request Sent!',
            description: `Your connection request to ${user.personal.name} has been sent.`,
        });
    };

    return (
        <Link href={`/users/${user.id}`} className="block">
            <Card className="h-full flex flex-col hover:bg-muted/50 transition-colors">
                <CardHeader className="items-center text-center space-y-1.5 p-4">
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
                <CardContent className="pt-0 flex-1 flex flex-col p-4">
                    <p className="text-sm text-muted-foreground text-center flex-1 line-clamp-3">{user.personal.bio}</p>
                    <Button 
                        variant={isRequested ? "secondary" : "default"}
                        size="sm" 
                        className="w-full mt-4" 
                        onClick={handleConnect}
                        disabled={isRequested}
                    >
                        {isRequested ? (
                            <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Request Sent
                            </>
                        ) : (
                            <>
                                <MessageSquare className="mr-2 h-4 w-4"/>
                                Connect
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
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
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 p-4 md:p-0">
              {mentors.map(mentor => (
                  <MentorCard key={mentor.id} user={mentor} />
              ))}
          </div>
    </main>
  );
}
