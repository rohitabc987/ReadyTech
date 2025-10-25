
import { getAllResources } from '@/lib/firebase/resources';
import ResourcesClient from './resources-client';

export default async function ResourcesPage() {
  const initialResources = await getAllResources();
  return <ResourcesClient initialResources={initialResources} />;
}
