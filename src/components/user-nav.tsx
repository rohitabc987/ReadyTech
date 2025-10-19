import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Mail, PlusCircle, User } from 'lucide-react';
import { mockCurrentUser } from '@/lib/mock-data';
import Link from 'next/link';

export function UserNav() {
  const user = mockCurrentUser;
  const userInitials = user.name.split(' ').map(n => n[0]).join('');

  if (!user) {
     return (
        <Button asChild>
            <Link href="/login">Login</Link>
        </Button>
     )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
             <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
             </Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
             <Link href="/create-post">
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Create Post</span>
             </Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Mail className="mr-2 h-4 w-4" />
            <span>Messages</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/login">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
