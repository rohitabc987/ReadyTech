import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getPostComments, getPostDetails, getPostResources, getPostStats } from '@/lib/firebase/posts';
import { getCurrentUser, getUserProfile } from '@/lib/firebase/users';
import { ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockQuestions } from '@/lib/data/mock-data';
import { InterviewExperience } from './interview-experience';
import { UserProfileCard } from '@/components/user-profile-card';


export default async function InterviewDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;

    const [
        interview,
        stats,
        interviewResources,
        interviewComments,
        currentUser
    ] = await Promise.all([
        getPostDetails(id),
        getPostStats(id),
        getPostResources(id),
        getPostComments(id),
        getCurrentUser()
    ]);
    
    if (!interview || !stats || !currentUser) {
        notFound();
    }
    
    const author = await getUserProfile(interview.main.authorId);
    
    // This part still uses mock-data directly, which is fine for now
    // as we transition. A real implementation would fetch from a 'questions' collection.
    const interviewQuestions = mockQuestions.filter(q => q.postId === interview.id);
    
    if (!author) {
        return notFound();
    }

    const isOwnProfile = currentUser.id === author.id;

    return (
        <main className="flex-1 mt-4">
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 flex flex-col gap-3 md:gap-6">
                    <InterviewExperience
                        interview={interview}
                        stats={stats}
                        interviewQuestions={interviewQuestions}
                        interviewResources={interviewResources}
                        author={author}
                    />
                    
                    <Card id="comments">
                        <CardHeader className="p-6">
                            <CardTitle>Comments ({stats.commentsCount})</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-6">
                            <div className="flex gap-4">
                                <Avatar>
                                    <AvatarImage src={currentUser.personal.avatarUrl} />
                                    <AvatarFallback>{currentUser.personal.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                    <textarea placeholder="Add a comment..." className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"></textarea>
                                    <Button>Post Comment</Button>
                                </div>
                            </div>
                            <Separator />
                            <div className="space-y-6">
                            {interviewComments.map(async comment => {
                                const commentAuthor = await getUserProfile(comment.authorId);
                                if (!commentAuthor) return null;
                                return (
                                    <div key={comment.id} className="flex gap-4">
                                        <Avatar>
                                            <AvatarImage src={commentAuthor.personal.avatarUrl} />
                                            <AvatarFallback>{commentAuthor.personal.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <p className="font-semibold">{commentAuthor.personal.name}</p>
                                                <p className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <p className="text-sm mt-1">{comment.text}</p>
                                            <Button variant="ghost" size="sm" className="mt-1 text-muted-foreground"><ThumbsUp className="mr-2 h-4 w-4"/>Like</Button>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Author card for desktop view */}
                <div className="hidden lg:block lg:col-span-1">
                   <Link href={`/users/${author.id}`}>
                        <UserProfileCard user={author} isOwnProfile={isOwnProfile} className="border rounded-lg"/>
                    </Link>
                </div>
            </div>
        </main>
    );
}
