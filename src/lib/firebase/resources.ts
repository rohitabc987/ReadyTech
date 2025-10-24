/**
 * This file simulates fetching resource-related data from Firestore.
 */
import { mockResources, mockPosts } from '@/lib/data/mock-data';
import type { Resource } from '@/lib/types';

export type EnrichedResource = Resource & { company?: string };

/**
 * Fetches all available resources and enriches them with company data.
 * In a real app, you might want to paginate this.
 */
export async function getAllResources(): Promise<EnrichedResource[]> {
    return mockResources.map(resource => {
        const post = mockPosts.find(p => p.id === resource.postId);
        return {
            ...resource,
            company: post?.main.company,
        }
    });
}
