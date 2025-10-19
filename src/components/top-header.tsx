'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';
import { UserNav } from './user-nav';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/create-post', label: 'Create Post' },
  { href: '/questions', label: 'Question Bank' },
  { href: '/resources', label: 'Resources' },
];

export function TopHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-8xl">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
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

        <div className="flex items-center gap-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
