
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
import { Mail, User as UserIcon, GraduationCapIcon } from 'lucide-react';
import type { User } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userInitials, setUserInitials] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Profile Summary */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                <Card className="shadow-lg">
                    <CardHeader className="items-center text-center p-6">
                        <Avatar className="h-28 w-28 border-4 border-background mb-2">
                            <AvatarImage src={imagePreview || user.personal.avatarUrl} alt={user.personal.name} />
                            <AvatarFallback className="text-4xl">{userInitials}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="font-headline text-2xl">{user.personal.name}</CardTitle>
                        <CardDescription>{user.personal.bio}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-4 text-sm text-muted-foreground flex flex-col items-center">
                        <div className="flex items-center gap-3">
                            <GraduationCapIcon className="h-5 w-5" />
                            <span>{user.academics.institution} &apos;{user.academics.graduationYear?.toString().slice(-2)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5" />
                            <span>{user.personal.email}</span>
                        </div>
                         <Button variant="outline" className="w-full mt-2"><UserIcon className="mr-2 h-4 w-4"/> View Public Profile</Button>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column - Editable Form */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                <form className="space-y-6">
                    <Card className="bg-muted/30 border-dashed">
                        <CardHeader className="p-6">
                            <CardTitle>Personal Details</CardTitle>
                            <CardDescription>Update your personal information. This will be displayed on your public profile.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 p-6 pt-0">
                            <div className="flex items-center gap-4">
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
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" defaultValue={user.personal.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" defaultValue={user.personal.email} disabled />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" placeholder="Tell us about yourself..." defaultValue={user.personal.bio} className="min-h-[100px]" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-muted/30 border-dashed">
                        <CardHeader className="p-6">
                          <CardTitle>Academic & Professional Info</CardTitle>
                          <CardDescription>Update your institution, graduation details, and mentorship status.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 p-6 pt-0">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="institution">Institution</Label>
                                    <Input id="institution" defaultValue={user.academics.institution} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="graduationYear">Graduation Year</Label>
                                    <Input id="graduationYear" type="number" defaultValue={user.academics.graduationYear} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4 bg-background">
                                <div className="space-y-0.5">
                                    <Label htmlFor="is-mentor" className="text-base">Available for Mentorship</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Enable this to appear in the "Connection" section for other users.
                                    </p>
                                </div>
                                <Switch id="is-mentor" defaultChecked={user.academics.role === 'mentor'} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit">Save All Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    </main>
  );
}
