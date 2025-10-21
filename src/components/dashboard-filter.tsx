
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function DashboardFilter() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Filters</CardTitle>
        <Button variant="link" className="text-primary p-0 h-auto">Clear</Button>
      </CardHeader>
      <CardContent className="space-y-4">
          <div className="space-y-2">
              <Label htmlFor="search-type">Post Type</Label>
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
                </SelectContent>
              </Select>
          </div>
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
              <Label htmlFor="search-college">College Name</Label>
              <Input id="search-college" placeholder="e.g. IIT Bombay..." />
          </div>
      </CardContent>
    </Card>
  );
}
