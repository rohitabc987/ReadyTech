
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Separator } from '@/components/ui/separator';

type QuestionWithCompany = Question & { company: string; interviewId: string };


function ComboboxFilter({ options, placeholder, className }: { options: string[], placeholder: string, className?: string }) {
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
          className={cn("w-full justify-between text-muted-foreground font-normal", className)}
        >
          <span className="truncate">
            {value
              ? frameworkList.find((framework) => framework.value === value)?.label || value
              : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
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
            <div className="flex flex-col md:flex-row md:justify-between items-center gap-2 mb-4">
                <div className="w-full grid grid-cols-2 gap-2 md:flex md:w-auto md:gap-4">
                    <ComboboxFilter options={companies} placeholder="Company .." className="md:w-60" />
                    <ComboboxFilter options={topics} placeholder="Topic .." className="md:w-60" />
                </div>
                <Button variant="outline" className="w-full md:w-auto mt-2 md:mt-0"><Filter className="mr-2 h-4 w-4" /> Apply</Button>
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
              <React.Fragment key={i}>
                <Card className="border-0 shadow-none bg-transparent">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base font-normal line-clamp-2">{q.text}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-x-3">
                        <Badge variant="secondary">{q.topic}</Badge>
                        <span>&bull;</span>
                        <span>{q.company}</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/interviews/${q.interviewId}`}>View Context</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Separator />
              </React.Fragment>
            ))}
          </div>
        </CardContent>
    </main>
  );
}
