
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getAllResources } from '@/lib/firebase/resources';
import { FileText, Link as LinkIcon, Search, Video, PlusCircle } from 'lucide-react';

const ResourceIcon = ({ type }: { type: 'pdf' | 'video' | 'link' }) => {
    switch (type) {
        case 'pdf': return <FileText className="h-6 w-6 text-destructive" />;
        case 'video': return <Video className="h-6 w-6 text-blue-500" />;
        case 'link': return <LinkIcon className="h-6 w-6 text-green-500" />;
    }
}

export default async function ResourcesPage() {
    const allResources = await getAllResources();

  return (
    <main className="flex-1 mt-4">
       
            <CardContent>
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                    <Input placeholder="Search resources..." className="pl-10"/>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {allResources.map(resource => (
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
                </div>
            </CardContent>
    </main>
  );
}
