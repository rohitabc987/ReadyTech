import { TopHeader } from '@/components/top-header';
import { Footer } from '@/components/footer';
import { MainSidebar } from '@/components/main-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <TopHeader />
        <div className="flex-1 items-start md:grid md:grid-cols-[auto_1fr]">
            <MainSidebar />
            <main className="container mx-auto flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl">
              {children}
            </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
