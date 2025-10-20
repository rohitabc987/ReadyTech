'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Briefcase, UserCheck, Search, FileText } from 'lucide-react';
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
    <Button variant="outline" size="lg" onClick={handleClick}>
      Continue as School Student
    </Button>
  );
};


export function LandingPageContent() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto text-center px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl text-primary">
              Ready, Set, Tech! Learn from Real Experiences, Not Just Books
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A community-driven platform connecting students with mentors, resources, and real-world interview experiences to excel in competitive exams and tech careers.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Continue as College Student <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <ComingSoonButton />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="mission" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold font-headline tracking-tight">Our Mission</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                    We believe that the best way to prepare for the future is to learn from those who have already walked the path. ReadyTech was created to bridge the gap between academic learning and real-world success. We connect aspiring students with a community of experienced seniors and mentors, making preparation for competitive exams and tech interviews more transparent, accessible, and effective for everyone.
                </p>
            </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-headline font-bold text-center mb-12">How It Works</h2>
              <div className="grid gap-8 md:grid-cols-3 text-center">
                  <div className="flex flex-col items-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-4 ring-4 ring-primary/5">
                          <UserCheck className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold font-headline">1. Create Your Profile</h3>
                      <p className="text-muted-foreground mt-2">Sign up with your institute email and tell us about your goals, whether you're a college student or a JEE aspirant.</p>
                  </div>
                  <div className="flex flex-col items-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-4 ring-4 ring-primary/5">
                          <Search className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold font-headline">2. Explore & Learn</h3>
                      <p className="text-muted-foreground mt-2">Browse interview experiences, search the question bank, and connect with mentors who fit your needs.</p>
                  </div>
                  <div className="flex flex-col items-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-4 ring-4 ring-primary/5">
                          <FileText className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold font-headline">3. Share & Contribute</h3>
                      <p className="text-muted-foreground mt-2">Give back to the community by sharing your own interview experiences and helping others on their journey.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">Explore Our Features</h2>
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline">Real Experiences</h3>
              <p className="text-muted-foreground mt-2">Learn from detailed interview experiences shared by students from top colleges.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline">Find Mentors</h3>
              <p className="text-muted-foreground mt-2">Connect with experienced mentors for personalized guidance and support.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline">Resource Library</h3>
              <p className="text-muted-foreground mt-2">Access a curated library of questions, articles, and videos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">What Our Community Says</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="https://images.unsplash.com/photo-1592621385612-4d7129426394?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc2MDgzNjQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Ananya Singh</p>
                    <p className="text-sm text-muted-foreground">IIT Delhi</p>
                  </div>
                </div>
                <p className="text-muted-foreground">"The interview experiences on ReadyTech were a game-changer for my placement preparation. Invaluable insights!"</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA4MzQ4MTV8MA&ixlib=rb-4.1.0&q=80&w=1080" />
                    <AvatarFallback>RV</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Rohan Verma</p>
                    <p className="text-sm text-muted-foreground">NIT Trichy</p>
                  </div>
                </div>
                <p className="text-muted-foreground">"Connecting with a mentor helped me build a clear roadmap for my career. Highly recommend this platform."</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwwfHx8fDE3NjA4MzE4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080" />
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Sneha Kumar</p>
                    <p className="text-sm text-muted-foreground">JEE Aspirant</p>
                  </div>
                </div>
                <p className="text-muted-foreground">"The question bank is amazing for JEE prep. The 'Coming Soon' for school students has me excited for more features!"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
