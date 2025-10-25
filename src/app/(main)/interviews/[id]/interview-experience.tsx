
'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StarRating } from '@/components/star-rating';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { Post, PostStats, Question, Resource } from '@/lib/types';
import { Briefcase, Calendar, FileText, Link as LinkIcon, Video } from 'lucide-react';

interface InterviewExperienceProps {
    interview: Post;
    stats: PostStats;
    interviewQuestions: Question[];
    interviewResources: Resource[];
}

const ResourceIcon = ({ type }: { type: 'pdf' | 'video' | 'link' }) => {
    switch (type) {
        case 'pdf': return <FileText className="h-4 w-4 text-destructive" />;
        case 'video': return <Video className="h-4 w-4 text-blue-500" />;
        case 'link': return <LinkIcon className="h-4 w-4 text-green-500" />;
    }
};

export function InterviewExperience({ interview, stats, interviewQuestions, interviewResources }: InterviewExperienceProps) {
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

    return (
        <>
            <Card>
                <CardHeader className="p-6">
                    <div className="flex items-start justify-between">
                        <CardTitle className="font-headline text-2xl pr-4">{interview.main.title}</CardTitle>
                        <div className="flex items-center gap-2 shrink-0">
                           <StarRating initialRating={stats.avgRating} totalRatings={stats.ratingsCount} postId={interview.id} />
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground pt-2">
                        <div className="flex items-center gap-2"><Briefcase className="h-4 w-4"/>{interview.main.company} &bull; {interview.main.role}</div>
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4"/>{new Date(interview.main.createdAt).toLocaleDateString()}</div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                    <p className="whitespace-pre-wrap">{interview.main.description}</p>
                    
                    {interviewQuestions.length > 0 && (
                        <>
                            <Separator className="my-6" />
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
                <Card>
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
