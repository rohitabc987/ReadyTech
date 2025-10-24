
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getAllResources } from '@/lib/firebase/resources';
import { FileText, Link as LinkIcon, Search, Video } from 'lucide-react';
import { ContentFilter } from '@/components/content-filter';
import type { Resource } from '@/lib/types';

const ResourceIcon = ({ type }: { type: 'pdf' | 'video' | 'link' }) => {
    switch (type) {
        case 'pdf': return <FileText className="h-6 w-6 text-destructive" />;
        case 'video': return <Video className="h-6 w-6 text-blue-500" />;
        case 'link': return <LinkIcon className="h-6 w-6 text-green-500" />;
    }
}

export default function ResourcesPage() {
    const [allResources, setAllResources] = React.useState<Resource[]>([]);
    const [filteredResources, setFilteredResources] = React.useState<Resource[]>([]);

    React.useEffect(() => {
      const loadResources = async () => {
        const resources = await getAllResources();
        setAllResources(resources);
        setFilteredResources(resources);
      };
      loadResources();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = e.target.value.toLowerCase();
      const newFilteredResources = allResources.filter(r => 
        r.title.toLowerCase().includes(searchTerm) || 
        r.description?.toLowerCase().includes(searchTerm)
      );
      setFilteredResources(newFilteredResources);
    };

    const handleApplyFilters = (filters: { company?: string; topic?: string; }) => {
      // Resource filtering logic can be added here if resources get tagged with company/topic
      console.log("Applying filters to resources:", filters);
    };

    const handleClearFilters = () => {
      // Logic to clear resource filters
      setFilteredResources(allResources);
    };

  return (
    <main className="flex-1 mt-4">
       <Card>
          <CardContent className="pt-6">
              <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                  <Input 
                    placeholder="Search resources by title or description..." 
                    className="pl-10"
                    onChange={handleSearch}
                  />
              </div>

              {/* In the future, resources could be tagged, enabling these filters. */}
              {/* <ContentFilter 
                initialFilters={{}}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
                showCompanyFilter={true}
                showTopicFilter={true}
              /> */}
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredResources.map(resource => (
                      <a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer" className="block hover:no-underline">
                          <Card className="h-full hover:bg-muted/50 transition-colors">
                              <CardHeader className="flex-row items-start gap-4 space-y-0 p-4">
                                  <div className="p-3 bg-muted rounded-lg">
                                      <ResourceIcon type={resource.type} />
                                  </div>
                                  <div>
                                      <CardTitle className="text-base font-semibold">{resource.title}</CardTitle>
                                      <CardDescription className="text-xs uppercase font-medium">{resource.type}</CardDescription>
                                  </div>
                              </CardHeader>
                              <CardContent className="p-4 pt-0">
                                  <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                              </CardContent>
                          </Card>
                      </a>
                  ))}
                  {filteredResources.length === 0 && (
                    <div className="md:col-span-3 text-center py-12 text-muted-foreground">
                      <h3 className="text-lg font-semibold">No resources found</h3>
                      <p>Try adjusting your search term.</p>
                    </div>
                  )}
              </div>
          </CardContent>
       </Card>
    </main>
  );
}
