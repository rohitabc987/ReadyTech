
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';

interface ComboboxInputProps {
  options: string[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

export function ComboboxInput({ options, placeholder, value, onChange, id }: ComboboxInputProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);

  const frameworkList = options.map(opt => ({ value: opt.toLowerCase(), label: opt }));

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  React.useEffect(() => {
    if (!open) {
      onChange(inputValue);
    }
  }, [open, inputValue, onChange]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        onChange(inputValue);
        setOpen(false);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
            <Input
                id={id}
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onClick={() => setOpen(true)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                role="combobox"
                aria-expanded={open}
            />
            <ChevronsUpDown 
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 shrink-0 opacity-50 cursor-pointer"
                onClick={() => setOpen(!open)}
            />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput 
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={inputValue}
            onValueChange={setInputValue}
            onKeyDown={handleKeyDown}
          />
          <CommandList>
            <CommandEmpty></CommandEmpty>
            <CommandGroup>
              {frameworkList.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    const selectedLabel = frameworkList.find(f => f.value === currentValue)?.label || '';
                    setInputValue(selectedLabel);
                    onChange(selectedLabel);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value.toLowerCase() === framework.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
