import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container mx-auto max-w-6xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
                <Logo />
                <p className="text-sm mt-2">Your gateway to tech interview success.</p>
            </div>
            <div className="flex gap-8">
                <Link href="#" className="text-sm hover:underline">About</Link>
                <Link href="#" className="text-sm hover:underline">Contact</Link>
                <Link href="#" className="text-sm hover:underline">Privacy Policy</Link>
            </div>
        </div>
        <div className="mt-8 pt-8 border-t border-footer-foreground/10 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} ReadyTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}