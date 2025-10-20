import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPosts, mockUsers, mockPostStats } from '@/lib/mock-data';
import { Briefcase, Calendar, GraduationCap, Mail, MessageSquare, Star } from 'lucide-react';
import Link from 'next/link';

export default function UserProfilePage({ params }: { params: { id: string } }) {
    const user = mockUsers.find(u => u.id === params.id) || mockUsers[0];
    const userInitials = user.personal.name.split(' ').map(n => n[0]).join('');
    const userInterviews = mockPosts.filter(i => i.main.authorId === user.id && i.main.type === 'interview');

    return (
        <main className="flex-1 mt-4">
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <Card className="text-center">
                        <CardHeader className="relative">
                            <div className="absolute top-4 right-4">
                                {user.academics.role === 'mentor' && <Badge variant="secondary">Mentor</Badge>}
                            </div>
                            <div className="flex justify-center">
                            <Avatar className="h-28 w-28 border-4 border-background shadow-md">
                                <AvatarImage src={user.personal.avatarUrl} alt={user.personal.name} />
                                <AvatarFallback className="text-4xl">{userInitials}</AvatarFallback>
                            </Avatar>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="font-headline">{user.personal.name}</CardTitle>
                            <CardDescription className="mt-1">{user.personal.bio}</CardDescription>
                            <div className="mt-4 flex flex-col items-center gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4" />
                                    <span>{user.academics.institution} &apos;{user.academics.graduationYear?.toString().slice(-2)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    <span>{user.personal.email}</span>
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
                            {userInterviews.length > 0 ? userInterviews.map(interview => {
                                const stats = mockPostStats.find(s => s.postId === interview.id);
                                return (
                                <div key={interview.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <h3 className="font-semibold text-primary">
                                        <Link href={`/interviews/${interview.id}`} className="hover:underline">{interview.main.title}</Link>
                                    </h3>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                        <div className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{interview.companyInfo.company}</div>
                                        <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(interview.main.createdAt).toLocaleDateString()}</div>
                                        {stats?.avgRating && <div className="flex items-center gap-1"><Star className="h-3 w-3" />{stats.avgRating.toFixed(1)}</div>}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{interview.main.description}</p>
                                </div>
                            )}) : (
                                <p className="text-sm text-center text-muted-foreground py-8">
                                    {user.personal.name} has not shared any experiences yet.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
