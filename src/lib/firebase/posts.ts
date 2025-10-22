
/**
 * This file simulates fetching post-related data from Firestore.
 * In a real app, you would replace the mock data logic with actual Firestore queries.
 */
import { mockPosts, mockPostStats, mockResources, mockComments } from '@/lib/data/mock-data';
import type { Post, PostStats, Resource, Comment } from '@/lib/types';

/**
 * Fetches all posts and combines them with their stats.
 * This simulates fetching from the 'posts' collection and joining with other data.
 */
export async function getPosts(): Promise<(Post & { stats: PostStats })[]> {
  const allPosts = mockPosts;
  
  const enrichedPosts = allPosts.map(post => {
    const stats = mockPostStats.find(s => s.postId === post.id);

    return {
      ...post,
      stats: stats || { postId: post.id, likes: 0, commentsCount: 0 },
    };
  });
  return enrichedPosts;
}

/**
 * Fetches the details for a single post.
 * @param id The ID of the post to fetch.
 */
export async function getPostDetails(id: string): Promise<Post | undefined> {
    const post = mockPosts.find(p => p.id === id);
    if (!post) return undefined;

    // In a real app, you might fetch author details separately here if needed
    // For now, the denormalized data in post.main is sufficient for most detail views
    return post;
}

/**
 * Fetches the stats for a single post.
 * @param id The ID of the post.
 */
export async function getPostStats(id: string): Promise<PostStats | undefined> {
    return mockPostStats.find(s => s.postId === id);
}


/**
 * Fetches the resources for a specific post.
 * This simulates querying the 'resources' subcollection of a post.
 * @param postId The ID of the post.
 */
export async function getPostResources(postId: string): Promise<Resource[]> {
    return mockResources.filter(r => r.postId === postId);
}

/**
 * Fetches the comments for a specific post.
 * This simulates querying the 'comments' subcollection of a post.
 * @param postId The ID of the post.
 */
export async function getPostComments(postId: string): Promise<Comment[]> {
    return mockComments.filter(c => c.postId === postId);
}

/**
 * Fetches posts created by a specific user.
 * @param userId The ID of the user.
 */
export async function getPostsByUserId(userId: string): Promise<Post[]> {
    return mockPosts.filter(p => p.main.authorId === userId);
}

    