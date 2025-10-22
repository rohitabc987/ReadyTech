
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@/lib/types';
import { getCurrentUser } from '@/lib/firebase/users';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real Firebase app, you would use onAuthStateChanged here
    // to listen for authentication state changes.
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to fetch user", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // You can show a loading skeleton or a spinner while the user data is being fetched.
  if (loading) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-14 items-center px-4 sm:px-6 lg:px-8 max-w-7xl justify-between">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </header>
            <main className="flex-1">
                <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
                    <Skeleton className="h-[80vh] w-full" />
                </div>
            </main>
        </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
