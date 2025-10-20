import { TopHeader } from '@/components/top-header';
import { Footer } from '@/components/footer';
import { MainSidebar } from '@/components/main-sidebar';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-14 items-center max-w-7xl">
                <div className="md:hidden">
                    <SidebarTrigger asChild>
                        <Button variant="ghost" size="icon" />
                    </SidebarTrigger>
                </div>
                <div className="flex flex-1 items-center justify-end">
                    <TopHeader />
                </div>
            </div>
        </header>
        <div className="flex flex-1 items-start">
            <Sidebar className="hidden md:flex">
                <MainSidebar />
            </Sidebar>
            <SidebarInset>
                <main className="container mx-auto flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl">
                {children}
                </main>
                <Footer />
            </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
