
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/lib/types';
import { GraduationCap, MessageSquare, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserProfileCardProps {
    user: User;
    isOwnProfile: boolean;
    isCompact?: boolean;
    className?: string;
}

export function UserProfileCard({ user, isOwnProfile, isCompact = false, className }: UserProfileCardProps) {
    const { toast } = useToast();
    const [isRequested, setIsRequested] = useState(false);

    const userInitials = user.personal.name.split(' ').map(n => n[0]).join('');

    const handleConnect = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsRequested(true);
        toast({
            title: 'Request Sent!',
            description: `Your connection request to ${user.personal.name} has been sent.`,
        });
    };

    if (isCompact) {
        return (
            <Card className={cn("h-full flex flex-col text-center", className)}>
                 <CardHeader className="items-center space-y-1.5 p-2 md:p-4">
                     <Avatar className="h-14 w-14  md:h-20 md:w-20 md:mb-3">
                        <AvatarImage src={user.personal.avatarUrl} alt={user.personal.name} />
                        <AvatarFallback className="text-3xl">{userInitials}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-lg">{user.personal.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span>{user.academics.institution}</span>
                    </div>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col p-2 md:p-4">
                    <p className="text-sm text-muted-foreground text-center flex-1 line-clamp-2 md:line-clamp-3">{user.personal.bio}</p>
                    {!isOwnProfile && (
                        <Button 
                            variant={isRequested ? "secondary" : "default"}
                            size="sm" 
                            className="w-full mt-2 md:mt-4" 
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
                                    <MessageSquare className="mr-2 h-4 w-4"/>
                                    Connect
                                </>
                            )}
                        </Button>
                    )}
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className={cn("text-center border-0 shadow-none", className)}>
            <CardHeader className="relative">
                <div className="absolute top-4 right-4">
                    {user.academics.role === 'mentor' && <Badge variant="secondary">Mentor</Badge>}
                </div>
                <div className="flex justify-center">
                    <Avatar className={cn("border-4 border-background shadow-md", isCompact ? "h-20 w-20" : "h-28 w-28")}>
                        <AvatarImage src={user.personal.avatarUrl} alt={user.personal.name} />
                        <AvatarFallback className={cn(isCompact ? "text-2xl" : "text-4xl")}>{userInitials}</AvatarFallback>
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
