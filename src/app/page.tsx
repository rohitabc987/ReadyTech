'use client';

import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { LandingPageContent } from '@/components/landing-page-content';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <LandingPageContent />
      <LandingFooter />
    </div>
  );
}
