import { Code } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Code className="h-8 w-8 text-primary" />
      <h1 className="text-2xl font-headline font-bold text-primary">
        ReadyTech
      </h1>
    </div>
  );
}
