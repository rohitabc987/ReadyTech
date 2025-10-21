
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Upload } from 'lucide-react';

export default function NewPostPage() {
  return (
    <main className="flex-1 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Share Your Knowledge & Experience</CardTitle>
          <CardDescription>Start by providing the core details of the experience you're sharing.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Core Details</CardTitle>
                    <CardDescription>This information helps others filter and find relevant experiences.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="post-type">Type of Post</Label>
                        <Select>
                            <SelectTrigger id="post-type">
                                <SelectValue placeholder="Select a post type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="technical-interview">Technical Interview</SelectItem>
                                <SelectItem value="hr-interview">HR Interview</SelectItem>
                                <SelectItem value="managerial-interview">Managerial Interview</SelectItem>
                                <SelectItem value="online-assessment">Online Assessment</SelectItem>
                                <SelectItem value="technical-test">Technical Test</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="e.g., Google" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Role / Position</Label>
                        <Input id="role" placeholder="e.g., Software Engineer Intern" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select>
                            <SelectTrigger id="difficulty">
                                <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="application-type">Application Type</Label>
                        <Select>
                            <SelectTrigger id="application-type">
                                <SelectValue placeholder="Select application type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Internship">Internship</SelectItem>
                                <SelectItem value="Full-Time">Full-Time</SelectItem>
                                <SelectItem value="Internship + FTE">Internship + FTE</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="result">Result</Label>
                        <Select>
                            <SelectTrigger id="result">
                                <SelectValue placeholder="Select the outcome" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Selected">Selected</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                                <SelectItem value="In Process">In Process</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., My Interview Experience at Google for SDE-1" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description / Your Experience</Label>
              <Textarea id="description" placeholder="Describe the process, rounds, questions asked, and any tips you have." className="min-h-[200px]" />
            </div>

            <div className="space-y-4">
                <Label>Questions Asked (Optional)</Label>
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
        </CardContent>
      </Card>
    </main>
  );
}
