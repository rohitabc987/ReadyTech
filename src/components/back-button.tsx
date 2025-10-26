'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';

const mainNavPaths = ['/dashboard', '/questions', '/resources', '/mentors', '/create-post', '/profile'];

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // This logic runs only on the client, avoiding server-side rendering issues.
    setShowButton(isMobile && !mainNavPaths.includes(pathname));
  }, [isMobile, pathname]);

  if (!showButton) {
    return null;
  }

  return (
    <Button
        variant="ghost"
        size="icon"
        className="mr-2 h-auto px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        onClick={() => router.back()}
    >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Back</span>
    </Button>
  );
}
