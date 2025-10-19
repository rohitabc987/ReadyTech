
import { Header } from '@/components/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUsers } from '@/lib/mock-data';
import { GraduationCap, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

function MentorCard({ user }: { user: (typeof mockUsers)[0] }) {
    const userInitials = user.personal.name.split(' ').map(n => n[0]).join('');

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="items-center text-center">
                 <Avatar className="h-24 w-24 mb-2">
                    <AvatarImage src={user.personal.avatarUrl} alt={user.personal.name} />
                    <AvatarFallback className="text-3xl">{userInitials}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline">{user.personal.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>{user.academics.institution}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground text-center flex-1">{user.personal.bio}</p>
                <Button asChild className="w-full mt-4">
                    <Link href={`/users/${user.id}`}><MessageSquare className="mr-2 h-4 w-4"/>View Profile</Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default function MentorsPage() {
    const mentors = mockUsers.filter(user => user.academics.role === 'mentor');

  return (
    <>
      <Header breadcrumbs={[{ href: '/mentors', label: 'Mentors' }]} />
      <main className="flex-1 mt-4">
        <Card>
            <CardHeader>
                <CardTitle>Find a Mentor</CardTitle>
                <CardDescription>Connect with experienced professionals from top companies and colleges.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {mentors.map(mentor => (
                        <MentorCard key={mentor.id} user={mentor} />
                    ))}
                </div>
            </CardContent>
        </Card>
      </main>
    </>
  );
}
