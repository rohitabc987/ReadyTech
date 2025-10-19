import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockPosts } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Calendar, MessageSquare, Star, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { mockUsers } from '@/lib/mock-data';
import { Separator } from '@/components/ui/separator';

function InterviewCard({ interview }: { interview: (typeof mockPosts)[0] }) {
  const author = mockUsers.find(u => u.id === interview.main.authorId);
  const userInitials = author ? author.personal.name.split(' ').map(n => n[0]).join('') : '';

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
                     <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{interview.companyInfo.company}</span>
                        <span>&bull;</span>
                        <span>{interview.companyInfo.role}</span>
                        <span>&bull;</span>
                        <div className="flex items-center gap-1"><Calendar className="h-4 w-4"/>{new Date(interview.main.createdAt).toLocaleDateString()}</div>
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
            <div className="relative mb-4">
                <p className="text-sm text-muted-foreground line-clamp-2 pr-20">{interview.main.description}</p>
                <Link href={`/interviews/${interview.id}`} className="absolute bottom-0 right-0 text-sm font-semibold text-primary hover:underline bg-background pl-2">
                    ...Read More
                </Link>
            </div>
            
            <Separator />
            <div className="flex items-center justify-start gap-4 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-auto px-2 py-1 gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{interview.stats.likes}</span>
                  <span className="sr-only">Likes</span>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-auto px-2 py-1 gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{interview.stats.comments.length}</span>
                  <span className="sr-only">Comments</span>
                </Button>
              </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const mockInterviews = mockPosts.filter(p => p.main.type === 'interview');

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
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
        </div>
        <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle>Interview Experiences</CardTitle>
                    <CardDescription>Browse experiences shared by the community.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-1">
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
