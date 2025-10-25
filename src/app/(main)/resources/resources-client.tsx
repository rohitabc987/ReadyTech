
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { EnrichedResource } from '@/lib/firebase/resources';
import { FileText, Link as LinkIcon, Video } from 'lucide-react';
import { ContentFilter } from '@/components/content-filter';

const ResourceIcon = ({ type }: { type: 'pdf' | 'video' | 'link' }) => {
    switch (type) {
        case 'pdf': return <FileText className="h-6 w-6 text-destructive" />;
        case 'video': return <Video className="h-6 w-6 text-blue-500" />;
        case 'link': return <LinkIcon className="h-6 w-6 text-green-500" />;
    }
}

export default function ResourcesClient({ initialResources }: { initialResources: EnrichedResource[] }) {
    const [allResources, setAllResources] = React.useState<EnrichedResource[]>(initialResources);
    const [filteredResources, setFilteredResources] = React.useState<EnrichedResource[]>(initialResources);

    React.useEffect(() => {
      setAllResources(initialResources);
      setFilteredResources(initialResources);
    }, [initialResources]);

    const handleApplyFilters = (filters: { company?: string; topic?: string; }) => {
      let resourcesToFilter = [...allResources];
      
      if (filters.company) {
        resourcesToFilter = resourcesToFilter.filter(r => r.company?.toLowerCase() === filters.company?.toLowerCase());
      }
      if (filters.topic) {
        resourcesToFilter = resourcesToFilter.filter(r => r.topic?.toLowerCase() === filters.topic?.toLowerCase());
      }

      setFilteredResources(resourcesToFilter);
    };

    const handleClearFilters = () => {
      setFilteredResources(allResources);
    };

  return (
    <main className="flex-1 mt-4">
      <ContentFilter 
        initialFilters={{}}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        showCompanyFilter={true}
        showTopicFilter={true}
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-2">
          {filteredResources.map(resource => (
              <a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer" className="block hover:no-underline">
                  <Card className="h-full hover:bg-muted/50 transition-colors">
                      <CardHeader className="flex-row items-start gap-4 space-y-0">
                          <div className="p-3 bg-muted rounded-lg">
                              <ResourceIcon type={resource.type} />
                          </div>
                          <div>
                              <CardTitle className="text-base font-semibold">{resource.title}</CardTitle>
                              <CardDescription className="text-xs uppercase font-medium">{resource.type}</CardDescription>
                          </div>
                      </CardHeader>
                      <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                      </CardContent>
                  </Card>
              </a>
          ))}
          {filteredResources.length === 0 && (
            <div className="md:col-span-3 text-center py-12 text-muted-foreground">
              <h3 className="text-lg font-semibold">No resources found</h3>
              <p>Try adjusting your filters.</p>
            </div>
          )}
      </div>
    </main>
  );
}
