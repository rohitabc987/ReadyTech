import { Header } from '@/components/header';
import { MainSidebar } from '@/components/main-sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { mockInterviews, mockUsers } from '@/lib/mock-data';
import { Briefcase, Calendar, GraduationCap, Mail, MessageSquare, Star } from 'lucide-react';
import Link from 'next/link';

export default function UserProfilePage({ params }: { params: { id: string } }) {
    const user = mockUsers.find(u => u.id === params.id) || mockUsers[0];
    const userInitials = user.name.split(' ').map(n => n[0]).join('');
    const userInterviews = mockInterviews.filter(i => i.author.id === user.id);

    return (
        <SidebarProvider>
            <MainSidebar />
            <SidebarInset>
                <Header breadcrumbs={[{ href: '/mentors', label: 'Mentors' }, { label: user.name }]} />
                <main className="flex-1 p-4 sm:px-6 sm:py-0">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-1 flex flex-col gap-6">
                            <Card className="text-center">
                                <CardHeader className="relative">
                                    <div className="absolute top-4 right-4">
                                        {user.isMentor && <Badge variant="secondary">Mentor</Badge>}
                                    </div>
                                    <div className="flex justify-center">
                                    <Avatar className="h-28 w-28 border-4 border-background shadow-md">
                                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                                        <AvatarFallback className="text-4xl">{userInitials}</AvatarFallback>
                                    </Avatar>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="font-headline">{user.name}</CardTitle>
                                    <CardDescription className="mt-1">{user.bio}</CardDescription>
                                    <div className="mt-4 flex flex-col items-center gap-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <GraduationCap className="h-4 w-4" />
                                            <span>{user.institution} &apos;{user.graduationYear.toString().slice(-2)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            <span>{user.email}</span>
                                        </div>
                                    </div>
                                    <Button className="mt-6 w-full">
                                        <MessageSquare className="mr-2 h-4 w-4" /> Connect
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Shared Experiences ({userInterviews.length})</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4">
                                    {userInterviews.length > 0 ? userInterviews.map(interview => (
                                        <div key={interview.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                            <h3 className="font-semibold text-primary">
                                                <Link href={`/interviews/${interview.id}`} className="hover:underline">{interview.title}</Link>
                                            </h3>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                                <div className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{interview.company}</div>
                                                <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(interview.date).toLocaleDateString()}</div>
                                                <div className="flex items-center gap-1"><Star className="h-3 w-3" />{interview.rating.toFixed(1)}</div>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{interview.experience}</p>
                                        </div>
                                    )) : (
                                        <p className="text-sm text-center text-muted-foreground py-8">
                                            {user.name} has not shared any experiences yet.
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
