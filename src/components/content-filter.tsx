
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { companies, topics } from '@/lib/data/company-data';
import { Filter, Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

type FilterSet = {
  company?: string;
  topic?: string;
};

interface ContentFilterProps {
  onApply: (filters: FilterSet) => void;
  onClear: () => void;
  initialFilters: FilterSet;
  showTopicFilter?: boolean;
  showCompanyFilter?: boolean;
}

function ComboboxFilter({ options, placeholder, value, onChange, className }: { options: string[], placeholder: string, value: string, onChange: (value: string) => void, className?: string }) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);

  const frameworkList = options.map(opt => ({ value: opt.toLowerCase(), label: opt }));

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSelect = (currentValue: string) => {
    const selectedLabel = frameworkList.find(f => f.value === currentValue)?.label || '';
    onChange(currentValue === value ? '' : selectedLabel);
    setInputValue(currentValue === value ? '' : selectedLabel);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between text-muted-foreground font-normal", className)}
        >
          <span className="truncate">
            {inputValue || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command shouldFilter={true}>
          <CommandInput 
            placeholder={`Search ${placeholder.toLowerCase()}...`}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {frameworkList.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={handleSelect}
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

export function ContentFilter({ 
  onApply, 
  onClear, 
  initialFilters,
  showCompanyFilter = true,
  showTopicFilter = true,
}: ContentFilterProps) {
  const [filters, setFilters] = React.useState<FilterSet>(initialFilters);

  const handleFilterChange = (key: keyof FilterSet, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApply(filters);
  };

  const handleClear = () => {
    setFilters({});
    onClear();
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center gap-2 mb-4">
        <div className="w-full grid grid-cols-2 gap-2 md:flex md:w-auto md:gap-4">
            {showCompanyFilter && (
              <ComboboxFilter 
                options={companies} 
                placeholder="Company .." 
                className="md:w-60"
                value={filters.company || ''}
                onChange={(value) => handleFilterChange('company', value)}
              />
            )}
            {showTopicFilter && (
              <ComboboxFilter 
                options={topics} 
                placeholder="Topic .." 
                className="md:w-60" 
                value={filters.topic || ''}
                onChange={(value) => handleFilterChange('topic', value)}
              />
            )}
        </div>
        <div className="w-full flex items-center gap-2 md:w-auto mt-2 md:mt-0">
          <Button variant="outline" className="w-full md:w-auto" onClick={handleClear}>Clear</Button>
          <Button className="w-full md:w-auto" onClick={handleApply}><Filter className="mr-2 h-4 w-4" /> Apply</Button>
        </div>
    </div>
  );
}
