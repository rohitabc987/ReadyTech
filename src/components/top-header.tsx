'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';
import { UserNav } from './user-nav';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/interviews/new', label: 'Create Post' },
  { href: '/questions', label: 'Question Bank' },
  { href: '/resources', label: 'Resources' },
];

export function TopHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname?.startsWith(item.href)
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* You can add a search bar here if you want */}
          </div>
          <nav className="flex items-center">
             <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
