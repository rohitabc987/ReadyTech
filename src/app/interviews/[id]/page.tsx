import { Header } from '@/components/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mockPosts, mockCurrentUser, mockUsers } from '@/lib/mock-data';
import { Briefcase, Calendar, FileText, Link as LinkIcon, MessageSquare, Star, ThumbsUp, Video } from 'lucide-react';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';

export default function InterviewDetailPage({ params }: { params: { id: string } }) {
    const interview = mockPosts.find(i => i.id === params.id) || mockPosts[0];
    const author = mockUsers.find(u => u.id === interview.main.authorId);
    const authorInitials = author ? author.personal.name.split(' ').map(n => n[0]).join('') : '';
    const currentUserInitials = mockCurrentUser.personal.name.split(' ').map(n => n[0]).join('');
    
    const ResourceIcon = ({ type }: { type: 'pdf' | 'video' | 'link' }) => {
        switch (type) {
            case 'pdf': return <FileText className="h-4 w-4 text-destructive" />;
            case 'video': return <Video className="h-4 w-4 text-blue-500" />;
            case 'link': return <LinkIcon className="h-4 w-4 text-green-500" />;
        }
    }

    return (
        <>
            <Header breadcrumbs={[{ href: '/dashboard', label: 'Experiences' }, { label: interview.main.title }]} />
            <main className="flex-1 mt-4">
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <CardTitle className="font-headline text-2xl">{interview.main.title}</CardTitle>
                                    <div className="flex items-center gap-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`h-6 w-6 cursor-pointer ${i < Math.round(interview.stats.avgRating || 0) ? 'fill-amber-400 text-amber-500' : 'fill-muted-foreground/50 text-muted-foreground'}`}/>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground pt-2">
                                    <div className="flex items-center gap-2"><Briefcase className="h-4 w-4"/>{interview.companyInfo.company} &bull; {interview.companyInfo.role}</div>
                                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4"/>{new Date(interview.main.createdAt).toLocaleDateString()}</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="whitespace-pre-wrap">{interview.main.description}</p>
                                
                                {interview.content.questions && interview.content.questions.length > 0 && (
                                    <>
                                        <Separator className="my-6" />
                                        <h3 className="font-semibold text-lg mb-4">Questions Asked</h3>
                                        <div className="space-y-4">
                                            {interview.content.questions.map((q, i) => (
                                                <div key={i} className="p-4 bg-muted/50 rounded-lg font-code">
                                                    <p>{q.text}</p>
                                                    {q.topic && <Badge variant="outline" className="mt-2">{q.topic}</Badge>}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {interview.content.resources && interview.content.resources.length > 0 && (
                                    <>
                                        <Separator className="my-6" />
                                        <h3 className="font-semibold text-lg mb-4">Helpful Resources</h3>
                                        <div className="space-y-2">
                                            {interview.content.resources.map(r => (
                                                <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50">
                                                    <ResourceIcon type={r.type} />
                                                    <div>
                                                        <p className="font-semibold">{r.title}</p>
                                                        <p className="text-sm text-muted-foreground">{r.description}</p>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle>Comments ({interview.stats.comments.length})</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarImage src={mockCurrentUser.personal.avatarUrl} />
                                        <AvatarFallback>{currentUserInitials}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-2">
                                        <Textarea placeholder="Add a comment..." />
                                        <Button>Post Comment</Button>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-6">
                                {interview.stats.comments.map(comment => {
                                    const commentAuthor = mockUsers.find(u => u.id === comment.authorId);
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
                                                <Button variant="ghost" size="sm" className="mt-1 text-muted-foreground"><ThumbsUp className="h-4 w-4 mr-2"/>Like</Button>
                                            </div>
                                        </div>
                                    )
                                })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {author && <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={author.personal.avatarUrl} alt={author.personal.name}/>
                                    <AvatarFallback>{authorInitials}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-base">Posted by</CardTitle>
                                    <CardDescription>
                                        <Link href={`/users/${author.id}`} className="font-semibold text-foreground hover:underline">
                                            {author.personal.name}
                                        </Link>
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{author.personal.bio}</p>
                                <Button asChild className="w-full mt-4">
                                    <Link href={`/users/${author.id}`}><MessageSquare className="mr-2 h-4 w-4"/>View Profile</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>}
                </div>
            </main>
        </>
    );
}
