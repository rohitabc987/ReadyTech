/**
 * This file simulates fetching user-related data from Firestore.
 */
import { mockUsers, mockCurrentUser } from '@/lib/data/mock-data';
import type { User } from '@/lib/types';

/**
 * Fetches all users who are mentors.
 */
export async function getMentors(): Promise<User[]> {
    return mockUsers.filter(user => user.academics.role === 'mentor');
}

/**
 * Fetches a single user's profile by their ID.
 * @param id The ID of the user to fetch.
 */
export async function getUserProfile(id: string): Promise<User | undefined> {
    return mockUsers.find(u => u.id === id);
}

/**
 * Fetches the currently logged-in user.
 * In a real app, this would involve checking the authentication state.
 */
export async function getCurrentUser(): Promise<User> {
    return mockCurrentUser;
}
