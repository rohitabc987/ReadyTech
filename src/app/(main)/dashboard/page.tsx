'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockPosts, mockUsers, mockCurrentUser } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Calendar, MessageSquare, Star, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

function InterviewCard({ interview }: { interview: (typeof mockPosts)[0] }) {
  const author = mockUsers.find(u => u.id === interview.main.authorId);
  const userInitials = author ? author.personal.name.split(' ').map(n => n[0]).join('') : '';
  const [isCommenting, setIsCommenting] = useState(false);
  const currentUserInitials = mockCurrentUser.personal.name.split(' ').map(n => n[0]).join('');
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(new Date(interview.main.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }));
  }, [interview.main.createdAt]);

  return (
    <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
            <div className="flex items-start gap-4">
                {author && (
                  <Link href={`/users/${author.id}`}>
                      <Avatar>
                          <AvatarImage src={author.personal.avatarUrl} alt={author.personal.name} />
                          <AvatarFallback>{userInitials}</AvatarFallback>
                      </Avatar>
                  </Link>
                )}
                <div className="flex-1">
                    <CardTitle className="font-headline text-lg">
                        <Link href={`/interviews/${interview.id}`} className="hover:underline">{interview.main.title}</Link>
                    </CardTitle>
                     <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-2"><Briefcase className="h-4 w-4" /><span>{interview.companyInfo.company}</span></div>
                        <div className="flex items-center gap-2"><span>&bull;</span><span>{interview.companyInfo.role}</span></div>
                        <div className="flex items-center gap-2"><span>&bull;</span><Calendar className="h-4 w-4"/>{formattedDate}</div>
                    </div>
                </div>
                {interview.stats.avgRating && (
                  <div className="flex items-center gap-1 text-sm text-amber-500 shrink-0">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                      <span className="font-semibold">{interview.stats.avgRating.toFixed(1)}</span>
                  </div>
                )}
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">{interview.main.description} <Link href={`/interviews/${interview.id}`} className="text-sm font-semibold text-primary hover:underline">...Read More</Link></p>
            
            <Separator className="my-4" />
            <div className="flex items-center justify-start gap-4 text-sm text-muted-foreground">
                <Button variant="ghost" size="sm" className="h-auto px-2 py-1 gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Like ({interview.stats.likes})</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-auto px-2 py-1 gap-1" onClick={() => setIsCommenting(!isCommenting)}>
                    <MessageSquare className="h-4 w-4" />
                    <span>Comment ({interview.stats.comments.length})</span>
                </Button>
            </div>
             {isCommenting && (
              <div className="pt-4">
                <Separator className="mb-4"/>
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
              </div>
            )}
        </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const mockInterviews = mockPosts.filter(p => p.main.type === 'interview');

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Filters</CardTitle>
              <Button variant="link" className="text-primary p-0 h-auto">Clear</Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="search-company">Company</Label>
                    <Input id="search-company" placeholder="e.g. Google, Microsoft..." />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="search-branch">Branch</Label>
                    <Input id="search-branch" placeholder="e.g. CSE, ECE..." />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="search-year">Year</Label>
                    <Input id="search-year" placeholder="e.g. 2024" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="search-college">College Name</Label>
                    <Input id="search-college" placeholder="e.g. IIT Bombay..." />
                </div>
            </CardContent>
          </Card>
        </aside>
        <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle>Interview Experiences</CardTitle>
                    <CardDescription>Browse experiences shared by the community.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {mockInterviews.map((interview) => (
                    <InterviewCard key={interview.id} interview={interview} />
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
