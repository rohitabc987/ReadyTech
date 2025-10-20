'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPosts, mockUsers, mockCurrentUser, mockPostStats } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Calendar, MessageSquare, Star, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import type { Post } from '@/lib/types';
import { DashboardFilter } from '@/components/dashboard-filter';


function InterviewCard({ interview }: { interview: Post }) {
  const author = mockUsers.find(u => u.id === interview.main.authorId);
  const stats = mockPostStats.find(s => s.postId === interview.id);
  const userInitials = author ? author.personal.name.split(' ').map(n => n[0]).join('') : '';
  const [isCommenting, setIsCommenting] = useState(false);
  const currentUserInitials = mockCurrentUser.personal.name.split(' ').map(n => n[0]).join('');
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (interview.main.createdAt) {
      setFormattedDate(new Date(interview.main.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }));
    }
  }, [interview.main.createdAt]);

  if (!stats) {
    return null;
  }

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
                {stats.avgRating && (
                  <div className="flex items-center gap-1 text-sm text-amber-500 shrink-0">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                      <span className="font-semibold">{stats.avgRating.toFixed(1)}</span>
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
                  <span>Like ({stats.likes})</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-auto px-2 py-1 gap-1" onClick={() => setIsCommenting(!isCommenting)}>
                    <MessageSquare className="h-4 w-4" />
                    <span>Comment ({stats.comments.length})</span>
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
          <DashboardFilter />
        </aside>
        <div className="lg:col-span-3">
                <CardContent className="grid gap-4">
                    {mockInterviews.map((interview) => (
                    <InterviewCard key={interview.id} interview={interview} />
                    ))}
                </CardContent>
        </div>
      </div>
    </>
  );
}
