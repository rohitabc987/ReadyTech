
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AuthProvider } from '@/context/auth-context';

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto p-0 sm:p-6 lg:p-8 max-w-7xl">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
