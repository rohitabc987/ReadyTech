
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { companies, topics } from '@/lib/data/company-data';
import { getAllQuestions } from '@/lib/firebase/questions';
import { Filter, Search, Check, ChevronsUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import type { Question } from '@/lib/types';

type QuestionWithCompany = Question & { company: string; interviewId: string };


function ComboboxFilter({ options, placeholder }: { options: string[], placeholder: string }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  const frameworkList = options.map(opt => ({ value: opt.toLowerCase(), label: opt }));

  React.useEffect(() => {
    if (!open) {
        // Find if the input value matches a label in the list
        const selectedFramework = frameworkList.find(
            (framework) => framework.label.toLowerCase() === inputValue.toLowerCase()
        );
        // If it doesn't match, or if the input is empty, set the value to the raw input value
        if (!selectedFramework) {
            setValue(inputValue);
        }
    }
  }, [open, inputValue, frameworkList]);


  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        setValue(inputValue);
        setOpen(false);
    }
  }


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-between text-muted-foreground font-normal"
        >
          <span className="truncate">
            {value
              ? frameworkList.find((framework) => framework.value === value)?.label || value
              : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={true}>
          <CommandInput 
            placeholder={placeholder}
            value={inputValue}
            onValueChange={setInputValue}
            onKeyDown={handleKeyDown}
          />
          <CommandList>
            <CommandEmpty></CommandEmpty>
            <CommandGroup>
              {frameworkList.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    const selectedLabel = frameworkList.find(f => f.value === currentValue)?.label || '';
                    setValue(currentValue === value ? '' : currentValue);
                    setInputValue(currentValue === value ? '' : selectedLabel)
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}


export default function QuestionsPage() {
  const [questions, setQuestions] = React.useState<QuestionWithCompany[]>([]);

  React.useEffect(() => {
    const loadQuestions = async () => {
      const allQuestions = await getAllQuestions();
      setQuestions(allQuestions);
    };
    loadQuestions();
  }, []);
    
  return (
    <main className="flex-1 mt-4">
        <CardContent>
            <div className="flex flex-col md:flex-row gap-2 mb-4">
                {/* <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                    <Input placeholder="Search questions..." className="pl-10"/>
                </div>
                 */}
                <ComboboxFilter options={companies} placeholder="Filter by Company" />
                <ComboboxFilter options={topics} placeholder="Filter by Topic" />

                <Button variant="outline" className="w-full md:w-auto"><Filter className="mr-2 h-4 w-4" /> Apply</Button>
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
                {questions.map((q, i) => (
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
            {questions.map((q, i) => (
              <Card key={i} className="border-0 shadow-none bg-transparent">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-normal">{q.text}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  <div className="flex items-center gap-x-3 text-sm text-muted-foreground">
                    <Badge variant="secondary">{q.topic}</Badge>
                    <span>&bull;</span>
                    <span>{q.company}</span>
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={`/interviews/${q.interviewId}`}>View Context</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
    </main>
  );
}
