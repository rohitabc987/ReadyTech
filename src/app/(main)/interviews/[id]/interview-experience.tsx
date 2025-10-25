
'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from '@/components/star-rating';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { Post, PostStats, Question, Resource, User } from '@/lib/types';
import { Briefcase, Calendar, FileText, Link as LinkIcon, Video, CheckCircle, XCircle, FileBadge } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

interface InterviewExperienceProps {
    interview: Post;
    stats: PostStats;
    interviewQuestions: Question[];
    interviewResources: Resource[];
    author: User;
}

const ResourceIcon = ({ type }: { type: 'pdf' | 'video' | 'link' }) => {
    switch (type) {
        case 'pdf': return <FileText className="h-4 w-4 text-destructive" />;
        case 'video': return <Video className="h-4 w-4 text-blue-500" />;
        case 'link': return <LinkIcon className="h-4 w-4 text-green-500" />;
    }
};

const getResultInfo = (result: Post['companyInfo']['result']) => {
    switch (result) {
      case 'Selected':
        return { icon: CheckCircle, color: 'text-green-600', text: 'Selected' };
      case 'Rejected':
        return { icon: XCircle, color: 'text-destructive', text: 'Not Selected' };
      default:
        return { icon: FileBadge, color: 'text-amber-600', text: 'In Process' };
    }
};

export function InterviewExperience({ interview, stats, interviewQuestions, interviewResources, author }: InterviewExperienceProps) {
    const { toast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            toast({
                title: 'Enjoying this post?',
                description: 'Consider giving it a rating to help others!',
            });
        }, 5000); // 5 seconds delay

        return () => clearTimeout(timer);
    }, [toast]);
    
    if (!author || !author.personal) {
        return null; // Or return a loading skeleton
    }

    const { icon: ResultIcon, color: resultColor, text: resultText } = getResultInfo(interview.companyInfo.result);
    const authorInitials = author.personal.name ? author.personal.name.split(' ').map(n => n[0]).join('') : '';


    return (
        <>
            <Card className="border-0 md:border">
                <CardHeader className="p-3 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        
                        {/* Mobile-only Header */}
                        <div className="flex flex-col md:hidden w-full gap-3">
                            <div className="flex items-center justify-between">
                                <Link href={`/users/${author.id}`}>
                                    <Avatar className="h-10 w-10 ml-1">
                                        <AvatarImage src={author.personal.avatarUrl} alt={author.personal.name} />
                                        <AvatarFallback>{authorInitials}</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <StarRating initialRating={stats.avgRating} totalRatings={stats.ratingsCount} postId={interview.id} />
                            </div>
                             {/* <div className="flex items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                <span>{interview.main.type}</span>
                                {interview.main.company && <div className="flex items-center gap-2"><Briefcase className="h-4 w-4"/>{interview.main.company} &bull; {interview.main.role}</div>}
                            </div> */}
                        </div>

                        {/* Title for all screens */}
                        <CardTitle className="font-headline text-2xl md:pr-4">{interview.main.title}</CardTitle>
                        
                        {/* Desktop-only Rating */}
                        <div className="hidden md:flex flex-shrink-0">
                           <StarRating initialRating={stats.avgRating} totalRatings={stats.ratingsCount} postId={interview.id} />
                        </div>
                    </div>
                    
                    <div className="hidden md:flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground pt-2">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold md:font-normal">{author.personal.name}</span>
                        </div>
                        <div className="flex items-center gap-2"><Briefcase className="h-4 w-4"/>{interview.main.company} &bull; {interview.main.role}</div>
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4"/>{new Date(interview.main.createdAt).toLocaleDateString()}</div>
                    </div>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                    <p className="whitespace-pre-wrap">{interview.main.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm mt-4">
                        <Badge variant="outline" className="capitalize">{interview.companyInfo.difficulty || 'N/A'}</Badge>
                        <Badge variant="outline">{interview.companyInfo.applicationType || 'N/A'}</Badge>
                        <div className={cn("flex items-center gap-1.5 font-semibold", resultColor)}>
                            <ResultIcon className="h-4 w-4" />
                            <span>{resultText}</span>
                        </div>
                    </div>
                    
                    {interviewQuestions.length > 0 && (
                        <>
                            <Separator className="my-4" />
                            <h3 className="font-semibold text-lg mb-4">Questions Asked</h3>
                            <div className="space-y-4">
                                {interviewQuestions.map((q, i) => (
                                    <div key={i} className="p-4 bg-muted/50 rounded-lg font-code">
                                        <p>{q.text}</p>
                                        {q.topic && <Badge variant="outline" className="mt-2">{q.topic}</Badge>}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {interviewResources.length > 0 && (
                <Card className="border-0 md:border">
                    <CardHeader className="p-6 pb-4">
                        <CardTitle>Helpful Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <div className="space-y-2">
                            {interviewResources.map(r => (
                                <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50">
                                    <ResourceIcon type={r.type} />
                                    <div>
                                        <p className="font-semibold">{r.title}</p>
                                        {r.description && <p className="text-sm text-muted-foreground">{r.description}</p>}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    );
}
