
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllQuestions } from '@/lib/firebase/questions';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Question } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { ContentFilter } from '@/components/content-filter';

type QuestionWithCompany = Question & { company: string; interviewId: string };

function QuestionsClient({ initialQuestions }: { initialQuestions: QuestionWithCompany[] }) {
  const [allQuestions, setAllQuestions] = React.useState<QuestionWithCompany[]>(initialQuestions);
  const [filteredQuestions, setFilteredQuestions] = React.useState<QuestionWithCompany[]>(initialQuestions);

  React.useEffect(() => {
    setAllQuestions(initialQuestions);
    setFilteredQuestions(initialQuestions);
  }, [initialQuestions]);

  const handleApplyFilters = (filters: { company?: string; topic?: string; }) => {
    let questionsToFilter = [...allQuestions];
    
    if (filters.company) {
      questionsToFilter = questionsToFilter.filter(q => q.company.toLowerCase().includes(filters.company?.toLowerCase() || ''));
    }
    if (filters.topic) {
      questionsToFilter = questionsToFilter.filter(q => q.topic?.toLowerCase().includes(filters.topic?.toLowerCase() || ''));
    }

    setFilteredQuestions(questionsToFilter);
  };

  const handleClearFilters = () => {
    setFilteredQuestions(allQuestions);
  };
    
  return (
    <main className="flex-1 mt-4">
        <ContentFilter 
          initialFilters={{}}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          showCompanyFilter={true}
          showTopicFilter={true}
        />

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
            {filteredQuestions.map((q, i) => (
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
        <div className="grid md:hidden gap-2">
        {filteredQuestions.map((q, i) => (
            <React.Fragment key={i}>
            <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="p-2 pb-2">
                <CardTitle className="text-base font-medium line-clamp-2">{q.text}</CardTitle>
                </CardHeader>
                <CardContent className="p-2 pt-1 pb-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-x-3 flex-wrap">
                    {q.topic && <Badge variant="secondary">{q.topic}</Badge>}
                    {q.topic && q.company && <span className="hidden sm:inline">&bull;</span>}
                    {q.company && <span>{q.company}</span>}
                    </div>
                    <Button variant="outline" size="sm" asChild className="h-auto px-2 py-1 text-xs">
                    <Link href={`/interviews/${q.interviewId}`}>View Context</Link>
                    </Button>
                </div>
                </CardContent>
            </Card>
            { i < filteredQuestions.length - 1 && <Separator /> }
            </React.Fragment>
        ))}
        </div>
    </main>
  );
}

export default async function QuestionsPage() {
  const initialQuestions = await getAllQuestions();
  return <QuestionsClient initialQuestions={initialQuestions} />;
}


// Keep the internal Table components for now, can be moved to ui/ if needed
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} {...props} />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <th ref={ref} className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className)} {...props} />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
));
TableCell.displayName = "TableCell";
