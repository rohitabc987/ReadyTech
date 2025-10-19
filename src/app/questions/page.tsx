import { Header } from '@/components/header';
import { MainSidebar } from '@/components/main-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockInterviews } from '@/lib/mock-data';
import { Filter, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function QuestionsPage() {
    const allQuestions = mockInterviews.flatMap(interview => 
        interview.questions.map(q => ({
            ...q,
            company: interview.company,
            interviewId: interview.id
        }))
    );
    // Deduplicate questions by question text
    const uniqueQuestions = Array.from(new Map(allQuestions.map(q => [q.question, q])).values());

  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <Header breadcrumbs={[{ href: '/questions', label: 'Question Bank' }]} />
        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          <Card>
            <CardHeader>
              <CardTitle>Question Bank</CardTitle>
              <CardDescription>
                Practice questions extracted from real interview experiences.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-2 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                        <Input placeholder="Search questions..." className="pl-10"/>
                    </div>
                    <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by Topic" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="trees">Trees</SelectItem>
                            <SelectItem value="graphs">Graphs</SelectItem>
                            <SelectItem value="arrays">Arrays</SelectItem>
                            <SelectItem value="system-design">System Design</SelectItem>
                            <SelectItem value="os">Operating Systems</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by Company" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="google">Google</SelectItem>
                            <SelectItem value="microsoft">Microsoft</SelectItem>
                            <SelectItem value="amazon">Amazon</SelectItem>
                            <SelectItem value="meta">Meta</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                </div>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2">Question</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead>Source Company</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uniqueQuestions.map((q) => (
                      <TableRow key={q.id}>
                        <TableCell className="font-medium">{q.question}</TableCell>
                        <TableCell><Badge variant="secondary">{q.topic}</Badge></TableCell>
                        <TableCell>{q.company}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/interviews/${q.interviewId}`}>View Context</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
