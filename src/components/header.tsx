import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type HeaderProps = {
  breadcrumbs: { href?: string; label: string }[];
};

export function Header({ breadcrumbs }: HeaderProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="inline-flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            <Link
              href={crumb.href || '#'}
              aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
              className={`transition-colors hover:text-foreground ${
                index === breadcrumbs.length - 1 ? 'font-normal text-foreground' : ''
              }`}
            >
              {crumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
