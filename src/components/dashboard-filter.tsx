import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function DashboardFilter() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Filters</CardTitle>
        <Button variant="link" className="text-primary p-0 h-auto">Clear</Button>
      </CardHeader>
      <CardContent className="space-y-4">
          <div className="space-y-2">
              <Label htmlFor="search-company">Company</Label>
              <Input id="search-company" placeholder="e.g. Google, Microsoft..." />
          </div>
          <div className="space-y-2">
              <Label htmlFor="search-role">Role</Label>
              <Input id="search-role" placeholder="e.g. SDE, PM..." />
          </div>
            <div className="space-y-2">
              <Label htmlFor="search-branch">Branch</Label>
              <Input id="search-branch" placeholder="e.g. CSE, ECE..." />
          </div>
            <div className="space-y-2">
              <Label htmlFor="search-year">Year</Label>
              <Input id="search-year" placeholder="e.g. 2024" />
          </div>
            <div className="space-y-2">
              <Label htmlFor="search-college">College Name</Label>
              <Input id="search-college" placeholder="e.g. IIT Bombay..." />
          </div>
      </CardContent>
    </Card>
  );
}
