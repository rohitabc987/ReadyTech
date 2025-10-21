/**
 * This file simulates fetching resource-related data from Firestore.
 */
import { mockResources } from '@/lib/data/mock-data';
import type { Resource } from '@/lib/types';

/**
 * Fetches all available resources.
 * In a real app, you might want to paginate this.
 */
export async function getAllResources(): Promise<Resource[]> {
    return mockResources;
}
