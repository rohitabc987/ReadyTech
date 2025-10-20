'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Briefcase,
  LayoutDashboard,
  Library,
  User,
  Users,
} from 'lucide-react';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import { UserNav } from './user-nav';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile', label: 'My Profile', icon: User },
  { href: '/interviews', label: 'Experiences', icon: Briefcase },
  { href: '/mentors', label: 'Find a Mentor', icon: Users },
  { href: '/questions', label: 'Question Bank', icon: Library },
  { href: '/resources', label: 'Resources', icon: BookOpen },
];

export function MainSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                tooltip={item.label}
                onClick={() => setOpenMobile(false)}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </>
  );
}
