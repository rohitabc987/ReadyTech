
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ComboboxInput } from './combobox-input';
import { companies, roles } from '@/lib/data/company-data';

export function DashboardFilter() {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Filters</CardTitle>
        <Button variant="link" className="text-primary p-0 h-auto">Clear</Button>
      </CardHeader>
      <CardContent className="space-y-4">
          <div className="space-y-2">
              <Label htmlFor="search-type">Type</Label>
               <Select>
                <SelectTrigger id="search-type">
                  <SelectValue placeholder="All" />
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
                value={company}
                onChange={setCompany}
              />
          </div>
          <div className="space-y-2">
              <Label htmlFor="search-role">Role</Label>
              <ComboboxInput
                id="search-role"
                options={roles}
                placeholder="e.g. SDE, PM..."
                value={role}
                onChange={setRole}
              />
          </div>
            <div className="space-y-2">
              <Label htmlFor="search-branch">Branch</Label>
              <Input id="search-branch" placeholder="e.g. CSE, ECE..." />
          </div>
          <div className="space-y-2">
              <Label htmlFor="search-college">College Name</Label>
              <Input id="search-college" placeholder="e.g. IIT Bombay..." />
          </div>
      </CardContent>
    </Card>
  );
}
