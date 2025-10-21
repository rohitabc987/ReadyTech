
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Upload } from 'lucide-react';
import { ComboboxInput } from '@/components/combobox-input';
import { companies, roles } from '@/lib/data/company-data';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const postFormSchema = z.object({
  postType: z.string({ required_error: "Post type is required." }),
  company: z.string().min(1, "Company is required."),
  role: z.string().min(1, "Role is required."),
  difficulty: z.string({ required_error: "Difficulty is required." }),
  applicationType: z.string({ required_error: "Application type is required." }),
  result: z.string({ required_error: "Result is required." }),
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
});

type PostFormValues = z.infer<typeof postFormSchema>;

export default function NewPostPage() {
    const form = useForm<PostFormValues>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            company: '',
            role: '',
            title: '',
            description: '',
        },
    });

    function onSubmit(data: PostFormValues) {
        console.log(data);
        // Here you would handle form submission, e.g., saving to Firestore
    }

  return (
    <main className="flex-1 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Share Your Knowledge & Experience</CardTitle>
          <CardDescription>Start by providing the core details of the experience you're sharing. Fields marked with <span className="text-destructive">*</span> are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              <Card className="bg-muted/30">
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                      <FormField
                          control={form.control}
                          name="postType"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Type <span className="text-destructive">*</span></FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                          <SelectTrigger>
                                              <SelectValue placeholder="Select a type" />
                                          </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                          <SelectItem value="technical-interview">Technical Interview</SelectItem>
                                          <SelectItem value="hr-interview">HR Interview</SelectItem>
                                          <SelectItem value="managerial-interview">Managerial Interview</SelectItem>
                                          <SelectItem value="online-assessment">Online Assessment</SelectItem>
                                          <SelectItem value="technical-test">Technical Test</SelectItem>
                                          <SelectItem value="other">Other</SelectItem>
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
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select application type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Internship">Internship</SelectItem>
                                        <SelectItem value="Full-Time">Full-Time</SelectItem>
                                        <SelectItem value="Internship + FTE">Internship + FTE</SelectItem>
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
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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

              <div className="space-y-4">
                  <Label>Questions Asked</Label>
                  <div className="space-y-2">
                      <Input placeholder="Question 1..."/>
                      <Input placeholder="Question 2..."/>
                  </div>
                  <Button variant="outline" size="sm" type="button"><PlusCircle className="mr-2 h-4 w-4" /> Add Question</Button>
              </div>
              
              <div className="space-y-4">
                  <Label>Cover Image & Resources (Optional)</Label>
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
                          <Input id="dropzone-file" type="file" className="hidden" />
                      </Label>
                  </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <Button variant="outline" type="button">Save as Draft</Button>
                  <Button type="submit">Publish Post</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
