import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container mx-auto max-w-7xl p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <h1 className="text-xl font-headline font-bold text-primary">
              ReadyTech
            </h1>
            <p className="text-sm mt-2 max-w-xs">Your gateway to success in tech interviews and competitive exams.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold uppercase tracking-wider">Company</h3>
            <ul className="space-y-1">
              <li><Link href="/questions" className="text-sm hover:underline">Question Bank</Link></li>
              <li><Link href="/mentors" className="text-sm hover:underline">Connection</Link></li>
              <li><Link href="#" className="text-sm hover:underline">About</Link></li>
              <li><Link href="#" className="text-sm hover:underline">Contact Us</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="space-y-1">
              <li><Link href="#" className="text-sm hover:underline">How it Works</Link></li>
              <li><Link href="#" className="text-sm hover:underline">Give Feedback</Link></li>
              <li><Link href="#" className="text-sm hover:underline">Know More</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="space-y-1">
              <li><Link href="#" className="text-sm hover:underline">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-footer-foreground/10 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} ReadyTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
