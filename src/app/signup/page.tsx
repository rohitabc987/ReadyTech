
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
    <Button variant="outline" size="lg" onClick={handleClick} className="w-full btn-glow">
      Continue as School Student
    </Button>
  );
};


export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-primary/5 to-transparent">
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center space-y-4 pt-8">
            <div className="text-5xl">🫶</div>
            <CardTitle className="font-headline text-3xl">Join ReadyTech</CardTitle>
            <CardDescription>
              Choose your path to get started. Are you a college student or a school student?
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 px-8">
            <div className="flex flex-col gap-4">
               <Button asChild size="lg" className="w-full btn-glow">
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
