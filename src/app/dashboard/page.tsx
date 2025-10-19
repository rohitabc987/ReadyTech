import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockInterviews, mockUsers } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Filter, GraduationCap, Star } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';

function InterviewCard({ interview }: { interview: (typeof mockInterviews)[0] }) {
  const userInitials = interview.author.name.split(' ').map(n => n[0]).join('');
  return (
    <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <CardTitle className="font-headline text-lg mb-1">
                        <Link href={`/interviews/${interview.id}`} className="hover:underline">{interview.title}</Link>
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span>{interview.company}</span>
                        <span>&bull;</span>
                        <span>{interview.role}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-amber-500">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                    <span className="font-semibold">{interview.rating.toFixed(1)}</span>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{interview.experience}</p>
            <div className="flex items-center gap-2 text-sm">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={interview.author.avatarUrl} alt={interview.author.name} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{interview.author.name}</p>
                    <p className="text-xs text-muted-foreground">{new Date(interview.date).toLocaleDateString()}</p>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

function MentorCard({ mentor }: { mentor: (typeof mockUsers)[0] }) {
  const userInitials = mentor.name.split(' ').map(n => n[0]).join('');
  return (
    <Card className="flex flex-col items-center p-6 text-center hover:shadow-lg transition-shadow">
        <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={mentor.avatarUrl} alt={mentor.name} />
            <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
        </Avatar>
        <CardTitle className="font-headline text-lg">
            <Link href={`/users/${mentor.id}`} className="hover:underline">{mentor.name}</Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm mt-1">
            <GraduationCap className="h-4 w-4"/> {mentor.institution} &apos;{mentor.graduationYear.toString().slice(-2)}
        </CardDescription>
        <CardContent className="p-0 mt-4">
            <p className="text-sm text-muted-foreground line-clamp-3">{mentor.bio}</p>
        </CardContent>
        <Button asChild size="sm" className="mt-4">
            <Link href={`/users/${mentor.id}`}>View Profile</Link>
        </Button>
    </Card>
  )
}

export default function DashboardPage() {
  const mentors = mockUsers.filter(u => u.isMentor);

  return (
    <>
      <Tabs defaultValue="interviews">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="interviews">Interview Experiences</TabsTrigger>
          <TabsTrigger value="mentors">Mentors</TabsTrigger>
        </TabsList>
        <TabsContent value="interviews">
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
               <div className="grid gap-4 md:grid-cols-1">
                {mockInterviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="mentors">
            <Card>
                <CardHeader>
                    <CardTitle>Find a Mentor</CardTitle>
                    <CardDescription>Connect with experienced professionals for guidance.</CardDescription>
                    <div className="flex flex-col md:flex-row gap-2 pt-2">
                        <Input placeholder="Search by name, company..." className="max-w-xs"/>
                        <Select>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Filter by Expertise" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="swe">Software Engineering</SelectItem>
                                <SelectItem value="pm">Product Management</SelectItem>
                                <SelectItem value="ds">Data Science</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Apply Filters</Button>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                   {mentors.map((mentor) => (
                       <MentorCard key={mentor.id} mentor={mentor} />
                   ))}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
