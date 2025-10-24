
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Upload, Trash2, File as FileIcon } from 'lucide-react';
import { ComboboxInput } from '@/components/combobox-input';
import { companies, roles } from '@/lib/data/company-data';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/context/auth-context';

const postFormSchema = z.object({
  postType: z.string({ required_error: "Type is required." }).min(1, "Type is required."),
  company: z.string().min(1, "Company name is required."),
  role: z.string().min(1, "Role is required."),
  difficulty: z.string({ required_error: "Difficulty is required." }).min(1, "Difficulty is required."),
  applicationType: z.string({ required_error: "Application type is required." }).min(1, "Application type is required."),
  result: z.string({ required_error: "Result is required." }).min(1, "Result is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
});

type PostFormValues = z.infer<typeof postFormSchema>;

type FormQuestion = {
  id: number;
  text: string;
  isMCQ: boolean;
  options: { id: number; text: string; isCorrect: boolean }[];
};

let questionCounter = 2;
let optionCounter = 0;

const DRAFT_KEY = 'post-draft';

export default function NewPostPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [questions, setQuestions] = useState<FormQuestion[]>([
        { id: 0, text: '', isMCQ: false, options: [] },
        { id: 1, text: '', isMCQ: false, options: [] }
    ]);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const form = useForm<PostFormValues>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            postType: '',
            company: '',
            role: '',
            difficulty: '',
            applicationType: '',
            result: '',
            title: '',
            description: '',
        },
    });

    useEffect(() => {
        const savedDraft = localStorage.getItem(DRAFT_KEY);
        if (savedDraft) {
            try {
                const draft = JSON.parse(savedDraft);
                form.reset(draft.formValues);
                setQuestions(draft.questions);
                toast({
                    title: 'Draft Loaded',
                    description: 'Your previously saved draft has been loaded.',
                });
            } catch (error) {
                console.error("Failed to parse draft from localStorage", error);
            }
        }
    }, [form, toast]);


    function onSubmit(data: PostFormValues) {
        if (!user) {
            console.error("User not logged in");
            return;
        }
        
        const postData = {
            id: new Date().toISOString(), // Example ID
            updatedAt: new Date(),
            main: {
                authorId: user.id,
                authorName: user.personal.name,
                authorAvatar: user.personal.avatarUrl || user.personal.name,
                type: data.postType,
                title: data.title,
                description: data.description,
                createdAt: new Date(),
                company: data.company,
                role: data.role,
                institution: user.academics.institution,
            },
            companyInfo: {
                difficulty: data.difficulty,
                applicationType: data.applicationType,
                result: data.result,
            },
            questions: questions,
            resources: uploadedFiles.map(file => ({
                name: file.name,
                size: file.size,
                type: file.type,
            })),
        };

        console.log("Submitting Post Data:", postData);
        // Here you would handle form submission, e.g., saving to Firestore
        // and uploading files to Firebase Storage
        
        // Clear draft after successful submission
        localStorage.removeItem(DRAFT_KEY);
        toast({ title: "Post Published!", description: "Your post is now live." });
    }

    const handleSaveDraft = () => {
        const draftData = {
            formValues: form.getValues(),
            questions: questions,
        };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
        toast({
            title: 'Draft Saved!',
            description: 'Your progress has been saved in this browser.',
        });
    };

    const addQuestion = () => {
        setQuestions([...questions, { id: questionCounter++, text: '', isMCQ: false, options: [] }]);
    };

    const removeQuestion = (questionId: number) => {
        setQuestions(questions.filter(q => q.id !== questionId));
    };

    const handleQuestionChange = (questionId: number, text: string) => {
        setQuestions(questions.map(q => q.id === questionId ? { ...q, text } : q));
    };

    const toggleMCQ = (questionId: number) => {
        setQuestions(questions.map(q => q.id === questionId ? { ...q, isMCQ: !q.isMCQ, options: q.isMCQ ? [] : [{id: optionCounter++, text: '', isCorrect: false}] } : q));
    };

    const addOption = (questionId: number) => {
        setQuestions(questions.map(q => q.id === questionId ? { ...q, options: [...q.options, { id: optionCounter++, text: '', isCorrect: false }] } : q));
    };

    const removeOption = (questionId: number, optionId: number) => {
        setQuestions(questions.map(q => q.id === questionId ? { ...q, options: q.options.filter(opt => opt.id !== optionId) } : q));
    };

    const handleOptionChange = (questionId: number, optionId: number, text: string) => {
        setQuestions(questions.map(q => 
            q.id === questionId 
            ? { ...q, options: q.options.map(opt => opt.id === optionId ? { ...opt, text } : opt) } 
            : q
        ));
    };
    
    const handleCorrectOptionChange = (questionId: number, correctOptionId: number) => {
        setQuestions(questions.map(q =>
            q.id === questionId
                ? { ...q, options: q.options.map(opt => ({ ...opt, isCorrect: opt.id === correctOptionId })) }
                : q
        ));
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setUploadedFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files!)]);
        }
    };

    const removeFile = (fileName: string) => {
        setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName));
    };


  return (
    <main className="flex-1 mt-4">
      <Card>
        <CardHeader className="p-6">
          <CardTitle>Share Your Knowledge & Experience</CardTitle>
          <CardDescription>Start by providing the core details of the experience you're sharing. Fields marked with <span className="text-destructive">*</span> are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"> 🧩 Basic Info</h3>
                <Card className="bg-muted/30 border-dashed">
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <FormField
                            control={form.control}
                            name="postType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type <span className="text-destructive">*</span></FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Technical Interview">Technical Interview</SelectItem>
                                            <SelectItem value="HR Interview">HR Interview</SelectItem>
                                            <SelectItem value="Managerial Interview">Managerial Interview</SelectItem>
                                            <SelectItem value="Online Assessment">Online Assessment</SelectItem>
                                            <SelectItem value="Technical Test">Technical Test</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company <span className="text-destructive">*</span></FormLabel>
                              <FormControl>
                                  <ComboboxInput
                                      options={companies}
                                      placeholder="e.g., Google"
                                      value={field.value}
                                      onChange={field.onChange}
                                  />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role / Position <span className="text-destructive">*</span></FormLabel>
                               <FormControl>
                                  <ComboboxInput
                                      options={roles}
                                      placeholder="e.g., Software Engineer Intern"
                                      value={field.value}
                                      onChange={field.onChange}
                                  />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                            control={form.control}
                            name="difficulty"
                            render={({ field }) => (
                              <FormItem>
                                    <FormLabel>Difficulty <span className="text-destructive">*</span></FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select difficulty" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="easy">Easy</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="hard">Hard</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="applicationType"
                            render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Application Type <span className="text-destructive">*</span></FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                          <SelectTrigger>
                                              <SelectValue placeholder="Select application type" />
                                          </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                          <SelectItem value="Internship">Internship</SelectItem>
                                          <SelectItem value="Full-Time">Full-Time</SelectItem>
                                          <SelectItem value="Internship + FTE">Internship + FTE</SelectItem>
                                          <SelectItem value="Other">Other</SelectItem>
                                      </SelectContent>
                                  </Select>
                                  <FormMessage />
                              </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="result"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Result <span className="text-destructive">*</span></FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select the outcome" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Selected">Selected</SelectItem>
                                            <SelectItem value="Rejected">Rejected</SelectItem>
                                            <SelectItem value="In Process">In Process</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
              </div>

              <div className=" p-2">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">📝 Description & Details</h3>
                <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., My Interview Experience at Google for SDE-1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description / Your Experience <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe the process, rounds, questions asked, and any tips you have." className="min-h-[200px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"> ❓ Questions Asked</h3>
                <Card className="bg-muted/30 border-dashed">
                  <CardContent className="gap-6 pt-4">
                      <div className="space-y-4">
                          {questions.map((question, qIndex) => (
                              <div key={question.id} className="p-1 space-y-4 ">
                                  <div className="flex gap-4 items-start">
                                      <Input 
                                          placeholder={qIndex === 0 ? "e.g., Tell me about a time you had a conflict with a team member." : "e.g., How does a hash map work internally?"} 
                                          value={question.text} 
                                          onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                                          className="flex-grow"
                                      />
                                      <Button variant="ghost" size="icon" type="button" onClick={() => removeQuestion(question.id)}>
                                          <Trash2 className="h-4 w-4 text-destructive" />
                                      </Button>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                      <Checkbox id={`is-mcq-${question.id}`} checked={question.isMCQ} onCheckedChange={() => toggleMCQ(question.id)} />
                                      <label htmlFor={`is-mcq-${question.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Is it MCQ ?
                                      </label>
                                  </div>
                                  {question.isMCQ && (
                                    <div className="pl-6 space-y-3">
                                        <Label>Options (Mark the correct answer)</Label>
                                        <RadioGroup
                                            onValueChange={(value) => handleCorrectOptionChange(question.id, parseInt(value))}
                                            className="space-y-2"
                                            value={question.options.find(opt => opt.isCorrect)?.id.toString()}
                                        >
                                            {question.options.map((option, oIndex) => (
                                                <div key={option.id} className="flex gap-2 items-center">
                                                    <RadioGroupItem value={option.id.toString()} id={`q${question.id}-o${option.id}`} />
                                                    <Input 
                                                        placeholder={`Option ${oIndex + 1}`}
                                                        value={option.text}
                                                        onChange={(e) => handleOptionChange(question.id, option.id, e.target.value)}
                                                        className="flex-1"
                                                    />
                                                    {question.options.length > 1 && (
                                                        <Button variant="ghost" size="icon" type="button" onClick={() => removeOption(question.id, option.id)}>
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                        </RadioGroup>
                                        <Button variant="outline" size="sm" type="button" onClick={() => addOption(question.id)}>
                                            <PlusCircle className="mr-2 h-4 w-4" /> Add Option
                                        </Button>
                                    </div>
                                  )}
                              </div>
                          ))}
                      </div>
                      <Button variant="outline" size="sm" type="button" onClick={addQuestion} className="mt-4"><PlusCircle className="mr-2 h-4 w-4" /> Add Question</Button>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">📁 Pdf & Resources</h3>
                  <div className="flex items-center justify-center w-full">
                      <Label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                      >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                          <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">Cover image, PDFs, or other resources</p>
                          </div>
                          <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} multiple />
                      </Label>
                  </div>
                  {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <h4 className="font-semibold text-sm">Uploaded Files:</h4>
                            <ul className="space-y-2">
                                {uploadedFiles.map((file, index) => (
                                    <li key={index} className="flex items-center justify-between p-2 border rounded-md bg-muted/50 text-sm">
                                        <div className="flex items-center gap-2 truncate">
                                            <FileIcon className="h-4 w-4 text-muted-foreground" />
                                            <span className="truncate">{file.name}</span>
                                            <span className="text-muted-foreground text-xs">({(file.size / 1024).toFixed(2)} KB)</span>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => removeFile(file.name)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <Button variant="outline" type="button" onClick={handleSaveDraft}>Save as Draft</Button>
                  <Button type="submit">Publish Post</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

    