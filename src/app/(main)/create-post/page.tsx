import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Upload } from 'lucide-react';

export default function NewInterviewPage() {
  return (
    <>
      <Header breadcrumbs={[{ href: '/dashboard', label: 'Dashboard' }, { label: 'Create Post' }]} />
      <main className="flex-1 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Share Your Interview Experience</CardTitle>
            <CardDescription>
              Help the community by sharing your knowledge. Fill out the details below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., My Interview Experience at Google for SDE-1" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="e.g., Google" />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="role">Role / Position</Label>
                      <Input id="role" placeholder="e.g., Software Engineer Intern" />
                  </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Your Experience</Label>
                <Textarea id="experience" placeholder="Describe the interview process, rounds, questions asked, and any tips you have." className="min-h-[200px]" />
              </div>

              <div className="space-y-4">
                  <Label>Questions Asked</Label>
                  <div className="space-y-2">
                      <Input placeholder="Question 1..."/>
                      <Input placeholder="Question 2..."/>
                  </div>
                  <Button variant="outline" size="sm" type="button"><PlusCircle className="mr-2 h-4 w-4" /> Add Question</Button>
              </div>
              
              <div className="space-y-4">
                  <Label>Resources & Attachments</Label>
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
                          <p className="text-xs text-muted-foreground">PDF, links, or other resources</p>
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
          </CardContent>
        </Card>
      </main>
    </>
  );
}
