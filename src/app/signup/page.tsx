
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LandingHeader } from '@/components/landing-header';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

function ComingSoonButton() {
  const { toast } = useToast();
  const handleClick = () => {
    toast({
      title: 'Coming Soon!',
      description: 'The portal for school students is under development. Stay tuned!',
    });
  };

  return (
    <Button variant="outline" size="lg" onClick={handleClick} className="w-full">
      Continue as School Student
    </Button>
  );
};


export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 flex items-center justify-center p-4 bg-muted/20">
        <Card className="w-full max-w-md mx-auto shadow-xl">
          <CardHeader className="text-center space-y-4 pt-8">
            <CardTitle className="font-headline text-2xl">Join ReadyTech</CardTitle>
            <CardDescription>
              Choose your path to get started. Are you a college student or a school student?
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 px-8">
            <div className="flex flex-col gap-4">
               <Button asChild size="lg" className="w-full">
                <Link href="/dashboard">
                  Continue as College Student
                </Link>
              </Button>
              <ComingSoonButton />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
