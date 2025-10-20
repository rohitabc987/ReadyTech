import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { LandingHeader } from '@/components/landing-header';

export default function LoginPage() {
  const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Google</title>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.6 1.62-4.8 1.62-3.87 0-7.02-3.15-7.02-7.02s3.15-7.02 7.02-7.02c2.2 0 3.68.86 4.54 1.68l2.54-2.54C18.49 1.82 15.74 0 12.48 0 5.88 0 0 5.88 0 12.48s5.88 12.48 12.48 12.48c7.1 0 12.24-4.92 12.24-12.72 0-.8-.08-1.6-.22-2.38h-12z"
      />
    </svg>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 flex items-center justify-center p-4 bg-muted/20">
        <Card className="w-full max-w-md  mx-auto shadow-xl">
          <CardHeader className="text-center space-y-4 pt-8">
           
            <CardTitle className="font-headline text-2xl">Welcome to ReadyTech</CardTitle>
            <CardDescription>
              A community for interview and exam preparation. Sign in to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 px-8">
            <div className="flex flex-col gap-4">
              <Button className="w-full">
                <GoogleIcon className="h-5 w-5 mr-2" />
                Sign In with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
