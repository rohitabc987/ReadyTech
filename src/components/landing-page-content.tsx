
'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Briefcase, UserCheck, Search, FileText, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { mockTestimonials } from '@/lib/data/testimonials-data';
import { cn } from '@/lib/utils';

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
  const ctaRef = useRef<HTMLDivElement>(null);
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false, // important: don't stop autoplay on hover
      stopOnMouseEnter: false,
    })
  )

  useEffect(() => {
    if (window.location.hash === '#join' && ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll('button');
      buttons.forEach((btn) => {
        btn.classList.add('animate-pulse-scale');
      });
  
      // remove after few seconds if needed
      setTimeout(() => {
        buttons.forEach((btn) => btn.classList.remove('animate-pulse-scale'));
      }, 4000);
    }
  }, []);
  
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section id="join" className="w-full py-20 pb-10 md:py-32 pb-20 lg:pb-30 py-40  bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto text-center px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl text-primary">
              Ready, Set, Tech! Learn from Real Experiences, Not Just Books
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A community-driven platform connecting students with mentors, resources, and real-world interview experiences to excel in competitive exams and tech careers.
            </p>
            <div 
              ref={ctaRef}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 p-2 rounded-lg"
            >
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
      {/* Our Mission Section */}
<section id="mission" className="relative overflow-hidden py-10 md:py-15 bg-gradient-to-b from-white via-primary/5 to-white">
  <div className="absolute inset-0 bg-grid-slate-100/40 [mask-image:radial-gradient(white,transparent_75%)]"></div>
  <div className="container relative mx-auto px-4 md:px-6">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold font-headline bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
        Our Mission
      </h2>
      <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
        At <span className="font-semibold text-primary">ReadyTech</span>, we’re redefining how students prepare for their future.
        We believe success isn’t built from textbooks alone — it’s built through
        <span className="font-medium text-foreground"> real stories, shared experiences, and community learning.</span>
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-primary/10">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <Users className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Empower Students</h3>
          <p className="text-muted-foreground mt-2">
            Helping every learner gain confidence through real-world guidance and mentorship.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-primary/10">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Bridge Academia & Reality</h3>
          <p className="text-muted-foreground mt-2">
            Making learning more practical, relatable, and aligned with real career paths.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-primary/10">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <Star className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Build a Thriving Community</h3>
          <p className="text-muted-foreground mt-2">
            Connecting students and mentors to grow together — one experience at a time.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <Button asChild size="lg" className="px-8 py-6 text-lg animate-pulse-border">
          <Link href="#join">
            Join the Movement <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
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
          <Carousel
            plugins={[autoplayPlugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {mockTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <Avatar className="h-16 w-16 mb-4">
                        <AvatarImage src={testimonial.avatarUrl} />
                        <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                      </Avatar>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.institution}</p>
                      <div className="flex gap-0.5 my-2">
                        {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />)}
                      </div>
                      <p className="text-muted-foreground text-sm flex-1">{testimonial.quote}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto text-center px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-headline font-bold tracking-tight">Ready to Kickstart Your Career?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join a thriving community of learners and mentors. Your journey to success starts here.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="#join">
                  Join Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
