
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ComboboxInput } from './combobox-input';
import { companies, roles } from '@/lib/data/company-data';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';

const initialFilterState = {
  type: '',
  company: '',
  role: '',
  year: '',
  college: '',
};

export function DashboardFilter() {
  const [filters, setFilters] = useState(initialFilterState);
  const [isOpen, setIsOpen] = useState(true);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleClearFilters = () => {
    setFilters(initialFilterState);
    // Add logic to re-fetch all posts if needed
  };
  
  const handleApplyFilters = () => {
    // Add logic here to filter the posts based on `filters` state
    console.log("Applying filters:", filters);
  };

  const areFiltersActive = Object.values(filters).some(value => value !== '');

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="flex flex-row items-center justify-between">
            <CollapsibleTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <CardTitle className="text-base flex items-center gap-2">
                  Filters
                  {areFiltersActive && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </CardTitle>
                <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </CollapsibleTrigger>
          <Button 
            variant="link" 
            className="text-primary p-0 h-auto"
            onClick={handleClearFilters}
          >
            Clear
          </Button>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-4">
              <div className="space-y-2">
                  <Label htmlFor="search-type">Type</Label>
                   <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value || '')}>
                    <SelectTrigger id="search-type">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="technical-interview">Technical Interview</SelectItem>
                      <SelectItem value="hr-interview">HR Interview</SelectItem>
                      <SelectItem value="managerial-interview">Managerial Interview</SelectItem>
                      <SelectItem value="online-assessment">Online Assessment</SelectItem>
                      <SelectItem value="technical-test">Technical Test</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="search-company">Company</Label>
                  <ComboboxInput
                    id="search-company"
                    options={companies}
                    placeholder="e.g. Google, Microsoft..."
                    value={filters.company}
                    onChange={(value) => handleFilterChange('company', value)}
                  />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="search-role">Role</Label>
                  <ComboboxInput
                    id="search-role"
                    options={roles}
                    placeholder="e.g. SDE, PM..."
                    value={filters.role}
                    onChange={(value) => handleFilterChange('role', value)}
                  />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="search-year">Year</Label>
                  <Input 
                    id="search-year" 
                    placeholder="e.g. 2024" 
                    value={filters.year}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                  />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="search-college">College Name</Label>
                  <Input 
                    id="search-college" 
                    placeholder="e.g. IIT Bombay..." 
                    value={filters.college}
                    onChange={(e) => handleFilterChange('college', e.target.value)}
                  />
              </div>
              <div className="flex justify-center pt-4">
                <Button variant="default" onClick={handleApplyFilters}>Apply Filters</Button>
              </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
