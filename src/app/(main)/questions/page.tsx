import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockPosts } from '@/lib/mock-data';
import { Filter, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function QuestionsPage() {
    const allQuestions = mockPosts.flatMap(interview => 
        (interview.content.questions || []).map(q => ({
            ...q,
            company: interview.companyInfo.company,
            interviewId: interview.id
        }))
    );
    // Deduplicate questions by question text
    const uniqueQuestions = Array.from(new Map(allQuestions.map(q => [q.text, q])).values());

  return (
    <main className="flex-1 mt-4">
      {/* <Card>
        <CardHeader>
          <CardTitle>Question Bank</CardTitle>
          <CardDescription>
            Practice questions extracted from real interview experiences.
          </CardDescription>
        </CardHeader> */}
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
                <Button variant="outline" className="w-full md:w-auto"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
            </div>
          <div className="hidden md:block border rounded-lg">
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
                {uniqueQuestions.map((q, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{q.text}</TableCell>
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
          <div className="grid md:hidden gap-4">
            {uniqueQuestions.map((q, i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader>
                  <CardDescription>Question</CardDescription>
                  <CardTitle className="text-base">{q.text}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex justify-between">
                    <CardDescription>Topic</CardDescription>
                    <Badge variant="secondary">{q.topic}</Badge>
                  </div>
                   <div className="flex justify-between">
                    <CardDescription>Source Company</CardDescription>
                    <span className="text-sm font-medium">{q.company}</span>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={`/interviews/${q.interviewId}`}>View Context</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      {/* </Card> */}
    </main>
  );
}
