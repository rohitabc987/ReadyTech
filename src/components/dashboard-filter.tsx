
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ComboboxInput } from './combobox-input';
import { companies, roles } from '@/lib/data/company-data';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Filter, XCircle } from 'lucide-react';

export type FilterState = {
  type: string;
  company: string;
  role: string;
  year: string;
  college: string;
};

interface DashboardFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onApply: () => void;
  onClear: () => void;
}

function DesktopFilter({ filters, onFilterChange, onApply, onClear }: DashboardFilterProps) {
    const areFiltersActive = Object.values(filters).some(value => value !== '');
    const areAdvancedFiltersActive = filters.year !== '' || filters.college !== '';
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleInputChange = (key: keyof FilterState, value: string) => {
        onFilterChange({ ...filters, [key]: value });
    };
    
    const applyAndClose = () => {
        onApply();
        setIsSheetOpen(false);
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center p-6">
                <CardTitle className=" text-bs md:text-2xl" >Filter Posts</CardTitle>
                {areFiltersActive && (
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClear}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 h-auto px-2 py-1"
                    >
                    <XCircle className="mr-1 h-4 w-4" />
                    Clear
                    </Button>
                )}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="main-search-type">Type</Label>
                    <Select value={filters.type} onValueChange={(value) => handleInputChange('type', value || '')}>
                        <SelectTrigger id="main-search-type">
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
                    <Label htmlFor="main-search-company">Company</Label>
                    <ComboboxInput
                        id="main-search-company"
                        options={companies}
                        placeholder="e.g. Google"
                        value={filters.company}
                        onChange={(value) => handleInputChange('company', value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="main-search-role">Role</Label>
                    <ComboboxInput
                        id="main-search-role"
                        options={roles}
                        placeholder="e.g. SDE"
                        value={filters.role}
                        onChange={(value) => handleInputChange('role', value)}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <Button onClick={onApply} className="w-full">Search</Button>
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full relative">
                        <Filter className="mr-2 h-4 w-4" /> More
                        {areAdvancedFiltersActive && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span></span>}
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                        <SheetTitle>All Filters</SheetTitle>
                        <SheetDescription>
                            Refine your search by applying more specific filters.
                        </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="sheet-search-type">Type</Label>
                                <Select value={filters.type} onValueChange={(value) => handleInputChange('type', value || '')}>
                                <SelectTrigger id="sheet-search-type">
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
                                <Label htmlFor="sheet-search-company">Company</Label>
                                <ComboboxInput
                                id="sheet-search-company"
                                options={companies}
                                placeholder="e.g. Google, Microsoft..."
                                value={filters.company}
                                onChange={(value) => handleInputChange('company', value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sheet-search-role">Role</Label>
                                <ComboboxInput
                                id="sheet-search-role"
                                options={roles}
                                placeholder="e.g. SDE, PM..."
                                value={filters.role}
                                onChange={(value) => handleInputChange('role', value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sheet-search-year">Year</Label>
                                <Input 
                                id="sheet-search-year" 
                                placeholder="e.g. 2024" 
                                value={filters.year}
                                onChange={(e) => handleInputChange('year', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sheet-search-college">College Name</Label>
                                <Input 
                                id="sheet-search-college" 
                                placeholder="e.g. IIT Bombay..." 
                                value={filters.college}
                                onChange={(e) => handleInputChange('college', e.target.value)}
                                />
                            </div>
                        </div>
                        <SheetFooter className="gap-2 sm:justify-between">
                        <Button 
                            variant="outline"
                            onClick={onClear}
                            className="w-full sm:w-auto"
                        >
                            Clear All
                        </Button>
                        <Button onClick={applyAndClose} className="w-full sm:w-auto">Apply Filters</Button>
                        </SheetFooter>
                    </SheetContent>
                    </Sheet>
                </div>
            </CardContent>
        </Card>
    );
}

function MobileFilter({ filters, onFilterChange, onApply, onClear }: DashboardFilterProps) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const areFiltersActive = Object.values(filters).some(value => value !== '');

    const handleInputChange = (key: keyof FilterState, value: string) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const applyAndClose = () => {
        onApply();
        setIsSheetOpen(false);
    }
    const areAdvancedFiltersActive = (filters.year !== '' && filters.year !== 'all') || (filters.college !== '' && filters.college !== 'all') || (filters.type !== '' && filters.type !== 'all');

    return (
        <div className="p-4 bg-card md:rounded-lg border">
            <div className="flex justify-between items-center ">
                <h2 className="text-lg font-bold mb-1 md: mb-2">Filter</h2>
                {areFiltersActive && (
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClear}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 h-auto px-2 py-1"
                    >
                    <XCircle className="mr-1 h-4 w-4" />
                    Clear
                    </Button>
                )}  
            </div>  
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                    {/* <Label htmlFor="mobile-search-company">Company</Label> */}
                    <ComboboxInput
                        id="mobile-search-company"
                        options={companies}
                        placeholder="Cmpany .."
                        value={filters.company}
                        onChange={(value) => handleInputChange('company', value)}
                    />
                </div>
                <div className="space-y-2">
                    {/* <Label htmlFor="mobile-search-role">Role</Label> */}
                    <ComboboxInput
                        id="mobile-search-role"
                        options={roles}
                        placeholder="Topic .."
                        value={filters.role}
                        onChange={(value) => handleInputChange('role', value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Button onClick={onApply} className="w-full">Search</Button>
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full relative">
                            <Filter className="mr-2 h-4 w-4" />
                            More
                            {areAdvancedFiltersActive && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span></span>}
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>All Filters</SheetTitle>
                            <SheetDescription>
                                Refine your search by applying more specific filters.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="sheet-search-type">Type</Label>
                                <Select value={filters.type} onValueChange={(value) => handleInputChange('type', value || '')}>
                                <SelectTrigger id="sheet-search-type">
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
                                <Label htmlFor="sheet-search-company">Company</Label>
                                <ComboboxInput
                                id="sheet-search-company"
                                options={companies}
                                placeholder="e.g. Google, Microsoft..."
                                value={filters.company}
                                onChange={(value) => handleInputChange('company', value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sheet-search-role">Role</Label>
                                <ComboboxInput
                                id="sheet-search-role"
                                options={roles}
                                placeholder="e.g. SDE, PM..."
                                value={filters.role}
                                onChange={(value) => handleInputChange('role', value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sheet-search-year">Year</Label>
                                <Input 
                                id="sheet-search-year" 
                                placeholder="e.g. 2024" 
                                value={filters.year}
                                onChange={(e) => handleInputChange('year', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sheet-search-college">College Name</Label>
                                <Input 
                                id="sheet-search-college" 
                                placeholder="e.g. IIT Bombay..." 
                                value={filters.college}
                                onChange={(e) => handleInputChange('college', e.target.value)}
                                />
                            </div>
                        </div>
                        <SheetFooter className="gap-2 sm:justify-between">
                        <Button 
                            variant="outline"
                            onClick={onClear}
                            className="w-full sm:w-auto"
                        >
                            Clear All
                        </Button>
                        <Button onClick={applyAndClose} className="w-full sm:w-auto">Apply Filters</Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}


export function DashboardFilter(props: DashboardFilterProps) {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopFilter {...props} />
      </div>
      <div className="block lg:hidden">
        <MobileFilter {...props} />
      </div>
    </>
  );
}
