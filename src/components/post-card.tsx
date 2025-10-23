
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

function MobilePostCard({ post, currentUser }: PostCardProps) {
    const { stats } = post;
    const { authorName, authorAvatar, company, role, type, createdAt, title, description, authorId } = post.main;
    const [formattedDate, setFormattedDate] = useState('');
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const [isClamped, setIsClamped] = useState(false);
    
    useEffect(() => {
        if (createdAt) {
            setFormattedDate(formatDistanceToNow(new Date(createdAt), { addSuffix: true }));
        }
    }, [createdAt]);

    useEffect(() => {
      function checkClamp() {
        if (descriptionRef.current) {
          setIsClamped(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
        }
      }
      checkClamp();
      window.addEventListener('resize', checkClamp);
      return () => window.removeEventListener('resize', checkClamp);
    }, []);

    const isAvatarUrl = authorAvatar?.startsWith('http');
    const avatarInitials = isAvatarUrl ? '' : authorAvatar?.split(' ').map(n => n[0]).join('') || '';
    const detailLink = `/interviews/${post.id}`;
    const showCompanyInfo = company && role;

    return (
        <div className="p-4">
            <div className="flex items-start gap-3">
                <Link href={`/users/${authorId}`}>
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={isAvatarUrl ? authorAvatar : undefined} alt={authorName} />
                        <AvatarFallback>{avatarInitials || authorName.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <Link href={detailLink} className="hover:underline">
                                <h3 className="font-semibold leading-snug line-clamp-2">{title}</h3>
                            </Link>
                            <div className="text-xs text-muted-foreground mt-1">
                                <span>{type}</span>
                                <span className="mx-1">&bull;</span>
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                        {stats.avgRating && (
                            <div className="flex items-center gap-1 text-xs text-amber-500 shrink-0 ml-2">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                                <span className="font-semibold">{stats.avgRating.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                    
                    <div className="relative mt-2">
                        <p ref={descriptionRef} className="text-sm text-muted-foreground line-clamp-2 pr-1">
                            {description}
                        </p>
                        {isClamped && (
                            <Link href={detailLink} className="absolute bottom-0 right-0 pl-1 text-sm font-semibold text-primary hover:underline bg-card">...Read More</Link>
                        )}
                    </div>

                    {showCompanyInfo && (
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mt-2">
                            <div className="flex items-center gap-1.5"><Briefcase className="h-3 w-3" /><span>{company}</span></div>
                            <div className="flex items-center gap-1.5"><span>&bull;</span><span>{role}</span></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-start gap-1 text-sm text-muted-foreground mt-2 -ml-2">
                <Button variant="ghost" size="sm" className="h-auto px-2 py-1 gap-1 text-xs">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Like ({stats.likes})</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-auto px-2 py-1 gap-1 text-xs">
                    <MessageSquare className="h-4 w-4" />
                    <span>Comment</span>
                </Button>
            </div>
        </div>
    );
}

function DesktopPostCard({ post, currentUser }: PostCardProps) {
  const { stats } = post;
  const { authorName, authorAvatar, company, role, type, createdAt, title, description, authorId } = post.main;
  
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
    <Card className="shadow-none border-0 rounded-none">
        <CardHeader className="p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-4">
                <Link href={`/users/${authorId}`}>
                    <Avatar className="h-10 w-10 md:h-12 md:w-12">
                        <AvatarImage src={isAvatarUrl ? authorAvatar : undefined} alt={authorName} />
                        <AvatarFallback className="text-sm md:text-base">{avatarInitials || authorName.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="flex-1">
                    <CardTitle className="font-headline text-base md:text-lg leading-snug">
                        <Link href={detailLink} className="hover:underline line-clamp-2">{title}</Link>
                    </CardTitle>
                     <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm text-muted-foreground mt-1">
                        <span>{authorName}</span>
                        <span className="text-muted-foreground/50">&bull;</span>
                        <span>{type}</span>
                         <div className="hidden sm:flex items-center gap-x-3">
                            <span className="text-muted-foreground/50">&bull;</span>
                            <span>{formattedDate}</span>
                         </div>
                    </div>
                </div>
                {stats.avgRating && (
                  <div className="flex items-center gap-1 text-xs md:text-sm text-amber-500 shrink-0">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                      <span className="font-semibold">{stats.avgRating.toFixed(1)}</span>
                  </div>
                )}
            </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
            <div className="relative mb-2">
              <p ref={descriptionRef} className="text-sm text-muted-foreground line-clamp-2 pr-1">
                {description}
              </p>
              {isClamped && (
                <Link href={detailLink} className="absolute bottom-0 right-0 pl-1 text-sm font-semibold text-primary hover:underline bg-card"> ...Read More</Link>
              )}
            </div>
            { showCompanyInfo &&
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-2">
                <div className="flex items-center gap-2"><Briefcase className="h-3 w-3" /><span>{company}</span></div>
                <div className="flex items-center gap-2"><span>&bull;</span><span>{role}</span></div>
              </div>
            }
            
            <Separator className="my-2 md:my-4" />
            <div className="flex items-center justify-start gap-2 md:gap-4 text-sm text-muted-foreground">
                <Button variant="ghost" size="sm" className="h-auto px-2 py-1 gap-1 text-xs md:text-sm">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Like ({stats.likes})</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-auto px-2 py-1 gap-1 text-xs md:text-sm" onClick={() => setIsCommenting(!isCommenting)}>
                    <MessageSquare className="h-4 w-4" />
                    <span>Comment</span>
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

export function PostCard(props: PostCardProps) {
  return (
    <>
      <div className="lg:hidden">
        <MobilePostCard {...props} />
      </div>
      <div className="hidden lg:block">
        <DesktopPostCard {...props} />
      </div>
    </>
  );
}
