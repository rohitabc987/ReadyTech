
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMentors } from '@/lib/firebase/users';
import type { User } from '@/lib/types';
import { GraduationCap, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

function MentorCard({ user }: { user: User }) {
    const userInitials = user.personal.name.split(' ').map(n => n[0]).join('');

    return (
        <Link href={`/users/${user.id}`} className="block">
            <Card className="h-full flex flex-col hover:bg-muted/50 transition-colors">
                <CardHeader className="items-center text-center p-4">
                     <Avatar className="h-16 w-16 mb-2">
                        <AvatarImage src={user.personal.avatarUrl} alt={user.personal.name} />
                        <AvatarFallback className="text-xl">{userInitials}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-base">{user.personal.name}</CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <GraduationCap className="h-3 w-3" />
                        <span>{user.academics.institution}</span>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-1 flex flex-col">
                    <p className="text-xs text-muted-foreground text-center flex-1 line-clamp-2">{user.personal.bio}</p>
                    <Button 
                        variant="default"
                        size="sm" 
                        className="w-full mt-3 text-xs" 
                        onClick={(e) => { e.preventDefault(); console.log("Connect with " + user.id)}}
                    >
                        <MessageSquare className="mr-1.5 h-3 w-3"/>Connect
                    </Button>
                </CardContent>
            </Card>
        </Link>
    )
}

export default async function MentorsPage() {
    const mentors = await getMentors();

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
