
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/lib/types';
import { GraduationCap, MessageSquare, CheckCircle } from 'lucide-react';

interface UserProfileCardProps {
    user: User;
    isOwnProfile: boolean;
}

export function UserProfileCard({ user, isOwnProfile }: UserProfileCardProps) {
    const { toast } = useToast();
    const [isRequested, setIsRequested] = useState(false);

    const userInitials = user.personal.name.split(' ').map(n => n[0]).join('');

    const handleConnect = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // In a real app, this would trigger a Firestore write.
        setIsRequested(true);

        toast({
            title: 'Request Sent!',
            description: `Your connection request to ${user.personal.name} has been sent.`,
        });
    };

    return (
        <Card className="text-center">
            <CardHeader className="relative">
                <div className="absolute top-4 right-4">
                    {user.academics.role === 'mentor' && <Badge variant="secondary">Mentor</Badge>}
                </div>
                <div className="flex justify-center">
                    <Avatar className="h-28 w-28 border-4 border-background shadow-md">
                        <AvatarImage src={user.personal.avatarUrl} alt={user.personal.name} />
                        <AvatarFallback className="text-4xl">{userInitials}</AvatarFallback>
                    </Avatar>
                </div>
            </CardHeader>
            <CardContent>
                <CardTitle className="font-headline">{user.personal.name}</CardTitle>
                <CardDescription className="mt-1">{user.personal.bio}</CardDescription>
                <div className="mt-4 flex flex-col items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>{user.academics.institution} &apos;{user.academics.graduationYear?.toString().slice(-2)}</span>
                    </div>
                </div>
                {!isOwnProfile && (
                     <Button
                        variant={isRequested ? "secondary" : "default"}
                        className="mt-6 w-full"
                        onClick={handleConnect}
                        disabled={isRequested}
                    >
                        {isRequested ? (
                            <>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                <p className="text-black" >Request Sent</p>
                            </>
                        ) : (
                            <>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Connect
                            </>
                        )}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
