
'use client';

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCurrentUser } from '@/lib/firebase/users';
import { Switch } from '@/components/ui/switch';
import { Mail, User as UserIcon, GraduationCapIcon, Phone, Linkedin, Github, Youtube, Bell, Moon, PlusCircle, X } from 'lucide-react';
import type { User } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { ComboboxInput } from '@/components/combobox-input';
import { iitList, nitList, iiitList, privateList } from '@/lib/data/collegelist';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const allColleges = [...iitList, ...nitList, ...iiitList, ...privateList];

const profileFormSchema = z.object({
  name: z.string().min(1, 'Full name is required.'),
  mobile: z.string().min(10, 'A valid mobile number is required.'),
  bio: z.string().min(1, 'Bio is required.'),
  institution: z.string().min(1, 'College name is required.'),
  branch: z.string().min(1, 'Branch is required.'),
  graduationYear: z.coerce.number({ required_error: "Graduation year is required."}).min(1950).max(2050),
  isMentor: z.boolean(),
  expertiseAreas: z.array(z.string()).optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  youtube: z.string().optional(),
  notificationsEnabled: z.boolean(),
  darkMode: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;


export default function ProfilePage() {
    const { toast } = useToast();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userInitials, setUserInitials] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newExpertise, setNewExpertise] = useState('');

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: '',
            mobile: '',
            bio: '',
            institution: '',
            branch: '',
            graduationYear: new Date().getFullYear() + 4,
            isMentor: false,
            expertiseAreas: [],
            linkedin: '',
            github: '',
            youtube: '',
            notificationsEnabled: false,
            darkMode: false,
        }
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
                setUserInitials(currentUser.personal.name.split(' ').map(n => n[0]).join(''));
                if (currentUser.personal.avatarUrl) {
                    setImagePreview(currentUser.personal.avatarUrl);
                }
                
                // Set form values from fetched user
                form.reset({
                    name: currentUser.personal.name || '',
                    mobile: currentUser.personal.mobile || '',
                    bio: currentUser.personal.bio || '',
                    institution: currentUser.academics.institution || '',
                    branch: currentUser.academics.branch || '',
                    graduationYear: currentUser.academics.graduationYear,
                    isMentor: currentUser.academics.role === 'mentor',
                    expertiseAreas: currentUser.expertise.expertiseAreas || [],
                    linkedin: currentUser.social.linkedin || '',
                    github: currentUser.social.github || '',
                    youtube: currentUser.social.youtube || '',
                    notificationsEnabled: currentUser.preferences.notificationsEnabled || false,
                    darkMode: currentUser.preferences.darkMode || false,
                });
                
            } catch (error) {
                console.error("Failed to fetch user", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePhotoChangeClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleAddExpertise = () => {
        if (newExpertise && !form.getValues('expertiseAreas')?.includes(newExpertise)) {
            const currentExpertise = form.getValues('expertiseAreas') || [];
            form.setValue('expertiseAreas', [...currentExpertise, newExpertise]);
            setNewExpertise('');
        }
    };

    const handleRemoveExpertise = (expertiseToRemove: string) => {
        const currentExpertise = form.getValues('expertiseAreas') || [];
        form.setValue('expertiseAreas', currentExpertise.filter(e => e !== expertiseToRemove));
    };

    function onSubmit(data: ProfileFormValues) {
        // Here you would typically save the user object to your backend/database
        console.log('User profile saved:', data);
        toast({
            title: 'Profile Saved!',
            description: 'Your changes have been successfully saved.',
        });
    };


    if (loading || !user) {
        return (
             <main className="flex-1 mt-4">
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                        <Skeleton className="h-[300px] w-full" />
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                        <Skeleton className="h-[250px] w-full" />
                        <Skeleton className="h-[250px] w-full" />
                    </div>
                </div>
            </main>
        );
    }

  return (
    <main className="flex-1 mt-4">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6 lg:grid-cols-4">
                    {/* Left Column - Profile Summary */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <Card>
                            <CardHeader className="items-center text-center p-6">
                                <Avatar className="h-28 w-28 border-4 border-background mb-2">
                                    <AvatarImage src={imagePreview || user.personal.avatarUrl} alt={user.personal.name} />
                                    <AvatarFallback className="text-4xl">{userInitials}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="font-headline text-2xl">{form.watch('name')}</CardTitle>
                                <CardDescription>{form.watch('branch') || 'Branch not set'}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-3">
                                    <GraduationCapIcon className="h-5 w-5 shrink-0" />
                                    <span className="truncate">{form.watch('institution') || 'Institution not set'} &apos;{form.watch('graduationYear')?.toString().slice(-2)}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 shrink-0" />
                                    <span className="truncate">{user.personal.email}</span>
                                </div>
                                 <Button asChild variant="outline" className="w-full mt-2"><Link href={`/users/${user.id}`}><UserIcon className="mr-2 h-4 w-4"/> View Public Profile</Link></Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Editable Form */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <Card className="bg-muted/30">
                            <CardHeader>
                                <CardTitle>🧑‍🎓 Personal Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-6 md:items-start">
                                    <div className='flex items-center gap-6'>
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage src={imagePreview || user.personal.avatarUrl} alt={user.personal.name} />
                                            <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <Button variant="outline" type="button" onClick={handlePhotoChangeClick}>Change Photo</Button>
                                            <p className="text-xs text-muted-foreground mt-2">JPG, GIF or PNG. 1MB max.</p>
                                            <Input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            onChange={handleFileChange}
                                            className="hidden" 
                                            accept="image/png, image/jpeg, image/gif"
                                            />
                                        </div>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2 w-full md:w-1/2">
                                                <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" value={user.personal.email} disabled />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="mobile"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel>Mobile Number <span className="text-destructive">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel>Bio <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Tell us about yourself..." className="min-h-[100px]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                            <CardTitle>🎓 Academic & Professional Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="institution"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel>College Name <span className="text-destructive">*</span></FormLabel>
                                                <FormControl>
                                                    <ComboboxInput
                                                        options={allColleges}
                                                        placeholder="Select or type your college"
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
                                        name="branch"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel>Branch <span className="text-destructive">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g., Computer Science" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="graduationYear"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel>Graduation Year <span className="text-destructive">*</span></FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="e.g., 2025" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="isMentor"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-background">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Available for Mentorship</FormLabel>
                                                <p className="text-sm text-muted-foreground">
                                                    Enable this to appear in the "Connection" section for other users.
                                                </p>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card className="bg-muted/30">
                            <CardHeader>
                                <CardTitle>😎 Areas of Expertise</CardTitle>
                                <CardDescription>Showcase your skills to attract mentees and connections.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2">
                                    <Input 
                                        placeholder="e.g., System Design" 
                                        value={newExpertise}
                                        onChange={(e) => setNewExpertise(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddExpertise(); }}}
                                    />
                                    <Button type="button" onClick={handleAddExpertise}>
                                        <PlusCircle className="h-4 w-4" />
                                        <span className="sr-only sm:not-sr-only sm:ml-2">Add</span>
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {form.watch('expertiseAreas')?.map((expertise, index) => (
                                        <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1 text-sm">
                                            {expertise}
                                            <button type="button" onClick={() => handleRemoveExpertise(expertise)} className="ml-2 rounded-full hover:bg-destructive/20 p-0.5">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle>🗣️ Social Links</CardTitle>
                                <CardDescription>Add links to your social and professional profiles.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="linkedin"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                            <FormControl>
                                                <Input placeholder="linkedin.com/in/..." className="pl-10" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="github"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                            <FormControl>
                                                <Input placeholder="github.com/..." className="pl-10" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="youtube"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                            <FormControl>
                                                <Input placeholder="youtube.com/..." className="pl-10" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card className="bg-muted/30">
                            <CardHeader>
                                <CardTitle>✋ Preferences & Settings</CardTitle>
                                <CardDescription>Manage your account settings and notifications.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 divide-y">
                                <FormField
                                    control={form.control}
                                    name="notificationsEnabled"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between pt-4 first:pt-0">
                                            <div className="space-y-0.5">
                                                <FormLabel>Email Notifications</FormLabel>
                                                <p className="text-sm text-muted-foreground">Receive notifications about new connections and messages.</p>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="darkMode"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between pt-4 first:pt-0">
                                            <div className="space-y-0.5">
                                                <FormLabel>Dark Mode</FormLabel>
                                                <p className="text-sm text-muted-foreground">Enable or disable the dark theme for your account.</p>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <div className="flex justify-center sticky bottom-4">
                            <Button size="lg" type="submit" className="shadow-lg">Save All Changes</Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    </main>
  );
}

    