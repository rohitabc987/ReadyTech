
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getMentors } from '@/lib/firebase/users';
import type { User } from '@/lib/types';
import { GraduationCap, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

function MentorCard({ user }: { user: User }) {
    const userInitials = user.personal.name.split(' ').map(n => n[0]).join('');

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="items-center text-center p-4">
                 <Avatar className="h-20 w-20 mb-2">
                    <AvatarImage src={user.personal.avatarUrl} alt={user.personal.name} />
                    <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-lg">{user.personal.name}</CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <GraduationCap className="h-3 w-3" />
                    <span>{user.academics.institution}</span>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1 flex flex-col">
                <p className="text-xs text-muted-foreground text-center flex-1 line-clamp-3">{user.personal.bio}</p>
                <Button asChild size="sm" className="w-full mt-3 text-xs">
                    <Link href={`/users/${user.id}`}><MessageSquare className="mr-1.5 h-3 w-3"/>Profile</Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default async function MentorsPage() {
    const mentors = await getMentors();

  return (
    <main className="flex-1 mt-4">
          <Card>
            <CardHeader>
                <CardTitle>Find a Mentor</CardTitle>
                <CardDescription>Connect with experienced professionals from top companies and colleges.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {mentors.map(mentor => (
                        <MentorCard key={mentor.id} user={mentor} />
                    ))}
                </div>
            </CardContent>
          </Card>
    </main>
  );
}
