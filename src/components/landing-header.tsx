'use client';

import Link from 'next/link';
import { Logo } from './logo';
import { Button } from './ui/button';

export function LandingHeader() {

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>

        <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
                <Link href="/login">Sign Up</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
