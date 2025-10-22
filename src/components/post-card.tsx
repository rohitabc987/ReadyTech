
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Calendar, MessageSquare, Star, ThumbsUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import type { Post, PostStats, User } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

export type EnrichedPost = Post & { 
  stats: PostStats;
};

interface PostCardProps {
  post: EnrichedPost;
  currentUser: User | null;
}

export function PostCard({ post, currentUser }: PostCardProps) {
  const { stats } = post;
  const { authorName, authorAvatar, company, role, type, createdAt } = post.main;
  
  const [isCommenting, setIsCommenting] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (createdAt) {
      setFormattedDate(formatDistanceToNow(new Date(createdAt), { addSuffix: true }));
    }
  }, [createdAt]);
  
  const isAvatarUrl = authorAvatar?.startsWith('http');
  const avatarInitials = isAvatarUrl ? '' : authorAvatar?.split(' ').map(n => n[0]).join('') || '';

  const currentUserInitials = currentUser?.personal.name.split(' ').map(n => n[0]).join('');

  if (!stats) {
    return null;
  }
  
  const detailLink = `/interviews/${post.id}`;

  const interviewTypes: Post['main']['type'][] = ['Technical Interview', 'HR Interview', 'Managerial Interview'];
  const showCompanyInfo = company && interviewTypes.includes(type);

  return (
    <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
            <div className="flex items-start gap-4">
                <Link href={`/users/${post.main.authorId}`}>
                    <Avatar>
                        <AvatarImage src={isAvatarUrl ? authorAvatar : undefined} alt={authorName} />
                        <AvatarFallback>{avatarInitials || authorName.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="flex-1">
                    <CardTitle className="font-headline text-lg">
                        <Link href={detailLink} className="hover:underline line-clamp-1">{post.main.title}</Link>
                    </CardTitle>
                     <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-2"><span>{type}</span></div>
                        {showCompanyInfo && (
                          <>
                            <div className="flex items-center gap-2"><span>&bull;</span><Briefcase className="h-4 w-4" /><span>{company}</span></div>
                            <div className="flex items-center gap-2"><span>&bull;</span><span>{role}</span></div>
                          </>
                        )}
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
            <p className="text-sm text-muted-foreground line-clamp-2">{post.main.description} <Link href={detailLink} className="text-sm font-semibold text-primary hover:underline">...Read More</Link></p>
            
            <Separator className="my-4" />
            <div className="flex items-center justify-start gap-4 text-sm text-muted-foreground">
                <Button variant="ghost" size="sm" className="h-auto px-2 py-1 gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Like ({stats.likes})</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-auto px-2 py-1 gap-1" onClick={() => setIsCommenting(!isCommenting)}>
                    <MessageSquare className="h-4 w-4" />
                    <span>Comment ({stats.commentsCount})</span>
                </Button>
            </div>
             {isCommenting && currentUser && (
              <div className="pt-4">
                <Separator className="mb-4"/>
                <div className="flex gap-4">
                    <Avatar>
                        <AvatarImage src={currentUser.personal.avatarUrl} />
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

    