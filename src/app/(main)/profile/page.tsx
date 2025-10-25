
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
import { Mail, User as UserIcon, GraduationCapIcon, Phone, Linkedin, Github, Youtube, Bell, Moon, PlusCircle, X, Brush } from 'lucide-react';
import type { User } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { ComboboxInput } from '@/components/combobox-input';
import { iitList, nitList, iiitList, privateList } from '@/lib/data/collegelist';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const allColleges = [...iitList, ...nitList, ...iiitList, ...privateList];

export default function ProfilePage() {
    const { toast } = useToast();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userInitials, setUserInitials] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newExpertise, setNewExpertise] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
                setUserInitials(currentUser.personal.name.split(' ').map(n => n[0]).join(''));
                if (currentUser.personal.avatarUrl) {
                    setImagePreview(currentUser.personal.avatarUrl);
                }
            } catch (error) {
                console.error("Failed to fetch user", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
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
    
    const handleFieldChange = (section: keyof User, field: keyof any, value: any) => {
        if (user) {
            setUser({
                ...user,
                [section]: {
                    // @ts-ignore
                    ...user[section],
                    [field]: value,
                },
            });
        }
    };
    
    const handleAddExpertise = () => {
        if (newExpertise && user && !user.expertise.expertiseAreas?.includes(newExpertise)) {
            handleFieldChange('expertise', 'expertiseAreas', [...(user.expertise.expertiseAreas || []), newExpertise]);
            setNewExpertise('');
        }
    };

    const handleRemoveExpertise = (expertiseToRemove: string) => {
        if (user) {
            handleFieldChange('expertise', 'expertiseAreas', user.expertise.expertiseAreas?.filter(e => e !== expertiseToRemove));
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the user object to your backend/database
        console.log('User profile saved:', user);
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
    <main className="flex-1 mt-4 bg-muted/30 md:bg-transparent">
        <form onSubmit={handleFormSubmit}>
            <div className="grid gap-6 lg:grid-cols-4">
                {/* Left Column - Profile Summary */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <Card>
                        <CardHeader className="items-center text-center p-6">
                            <Avatar className="h-28 w-28 border-4 border-background mb-2">
                                <AvatarImage src={imagePreview || user.personal.avatarUrl} alt={user.personal.name} />
                                <AvatarFallback className="text-4xl">{userInitials}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="font-headline text-2xl">{user.personal.name}</CardTitle>
                            <CardDescription>{user.academics.branch || 'Branch not set'}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <GraduationCapIcon className="h-5 w-5 shrink-0" />
                                <span className="truncate">{user.academics.institution || 'Institution not set'} &apos;{user.academics.graduationYear?.toString().slice(-2)}</span>
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Details</CardTitle>
                            <CardDescription>Update your public profile information.</CardDescription>
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
                                <div className="space-y-2 w-full md:w-1/2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" value={user.personal.name || ''} onChange={(e) => handleFieldChange('personal', 'name', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value={user.personal.email} disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mobile">Mobile Number</Label>
                                    <Input id="mobile" value={user.personal.mobile || ''} onChange={(e) => handleFieldChange('personal', 'mobile', e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" placeholder="Tell us about yourself..." value={user.personal.bio || ''} onChange={(e) => handleFieldChange('personal', 'bio', e.target.value)} className="min-h-[100px]" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                          <CardTitle>Academic & Professional Info</CardTitle>
                          <CardDescription>Update your institution, graduation details, and mentorship status.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="institution">College Name</Label>
                                     <ComboboxInput
                                        id="institution"
                                        options={allColleges}
                                        placeholder="Select or type your college"
                                        value={user.academics.institution || ''}
                                        onChange={(value) => handleFieldChange('academics', 'institution', value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="branch">Branch</Label>
                                    <Input id="branch" placeholder="e.g., Computer Science" value={user.academics.branch || ''} onChange={(e) => handleFieldChange('academics', 'branch', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="graduationYear">Graduation Year</Label>
                                    <Input id="graduationYear" type="number" placeholder="e.g., 2025" value={user.academics.graduationYear || ''} onChange={(e) => handleFieldChange('academics', 'graduationYear', parseInt(e.target.value))} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4 bg-background">
                                <div className="space-y-0.5">
                                    <Label htmlFor="is-mentor" className="text-base">Available for Mentorship</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Enable this to appear in the "Connection" section for other users.
                                    </p>
                                </div>
                                <Switch id="is-mentor" checked={user.academics.role === 'mentor'} onCheckedChange={(checked) => handleFieldChange('academics', 'role', checked ? 'mentor' : 'learner')} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Areas of Expertise</CardTitle>
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
                                {user.expertise.expertiseAreas?.map((expertise, index) => (
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
                            <CardTitle>Social Links</CardTitle>
                            <CardDescription>Add links to your social and professional profiles.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="relative">
                                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="linkedin.com/in/..." className="pl-10" value={user.social.linkedin || ''} onChange={(e) => handleFieldChange('social', 'linkedin', e.target.value)} />
                            </div>
                            <div className="relative">
                                <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="github.com/..." className="pl-10" value={user.social.github || ''} onChange={(e) => handleFieldChange('social', 'github', e.target.value)} />
                            </div>
                            <div className="relative">
                                <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="youtube.com/..." className="pl-10" value={user.social.youtube || ''} onChange={(e) => handleFieldChange('social', 'youtube', e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Preferences & Settings</CardTitle>
                            <CardDescription>Manage your account settings and notifications.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 divide-y">
                             <div className="flex items-center justify-between pt-4 first:pt-0">
                                <div className="space-y-0.5">
                                    <Label htmlFor="notifications-enabled">Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive notifications about new connections and messages.</p>
                                </div>
                                <Switch id="notifications-enabled" checked={user.preferences.notificationsEnabled} onCheckedChange={(checked) => handleFieldChange('preferences', 'notificationsEnabled', checked)} />
                            </div>
                             <div className="flex items-center justify-between pt-4 first:pt-0">
                                <div className="space-y-0.5">
                                    <Label htmlFor="dark-mode">Dark Mode</Label>
                                    <p className="text-sm text-muted-foreground">Enable or disable the dark theme for your account.</p>
                                </div>
                                <Switch id="dark-mode" checked={user.preferences.darkMode} onCheckedChange={(checked) => handleFieldChange('preferences', 'darkMode', checked)} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end sticky bottom-4">
                        <Button size="lg" type="submit" className="shadow-lg">Save All Changes</Button>
                    </div>
                </div>
            </div>
        </form>
    </main>
  );
}

    