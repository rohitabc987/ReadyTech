
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getPostStats, getPostsByUserId } from '@/lib/firebase/posts';
import { getCurrentUser, getUserProfile } from '@/lib/firebase/users';
import { Briefcase, Calendar, GraduationCap, MessageSquare, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { UserProfileCard } from '@/components/user-profile-card';

export default async function UserProfilePage({ params }: { params: { id: string } }) {
    const [user, currentUser] = await Promise.all([
        getUserProfile(params.id),
        getCurrentUser()
    ]);
    
    if (!user || !currentUser) {
        notFound();
    }

    const userInterviews = await getPostsByUserId(user.id);
    const isOwnProfile = currentUser.id === user.id;

    return (
        <main className="flex-1 mt-4">
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <UserProfileCard user={user} isOwnProfile={isOwnProfile} />
                </div>
                <div className="lg:col-span-2">
                    <Card className="border-0 shadow-none">
                        <CardHeader>
                            <CardTitle>Shared Experiences ({userInterviews.length})</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            {userInterviews.length > 0 ? (await Promise.all(userInterviews.map(async interview => {
                                const stats = await getPostStats(interview.id);
                                return (
                                <Card key={interview.id} className="transition-colors hover:bg-muted/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold">
                                            <Link href={`/interviews/${interview.id}`} className="hover:underline">{interview.main.title}</Link>
                                        </CardTitle>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                                            {interview.main.company && <div className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{interview.main.company}</div>}
                                            <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(interview.main.createdAt).toLocaleDateString()}</div>
                                            {stats?.avgRating && <div className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-500" />{stats.avgRating.toFixed(1)}</div>}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{interview.main.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/interviews/${interview.id}`}>View Post <ArrowRight className="ml-2 h-4 w-4"/></Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )}))) : (
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
