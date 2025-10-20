'use client';

import { UserNav } from './user-nav';
import { Logo } from './logo';
import Link from 'next/link';

export function TopHeader() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-6 md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
          <UserNav />
      </div>
    </div>
  );
}
