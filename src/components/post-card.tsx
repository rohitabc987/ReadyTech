
'use client';

import { useEffect, useState, useRef } from 'react';
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
  const [isClamped, setIsClamped] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);


  useEffect(() => {
    if (createdAt) {
      setFormattedDate(formatDistanceToNow(new Date(createdAt), { addSuffix: true }));
    }
  }, [createdAt]);
  
  useEffect(() => {
    function checkClamp() {
      if (descriptionRef.current) {
        const isCurrentlyClamped = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
        if (isClamped !== isCurrentlyClamped) {
          setIsClamped(isCurrentlyClamped);
        }
      }
    }
    checkClamp();
    window.addEventListener('resize', checkClamp);
    return () => window.removeEventListener('resize', checkClamp);
  }, [isClamped]);


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
            <div className="relative">
              <p ref={descriptionRef} className="text-sm text-muted-foreground line-clamp-2 pr-1">
                {post.main.description}
              </p>
              {isClamped && (
                <Link href={detailLink} className="absolute bottom-0 right-0 pl-1 text-sm font-semibold text-primary hover:underline bg-card"> ...Read More</Link>
              )}
            </div>
            
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
