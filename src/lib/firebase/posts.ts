/**
 * This file simulates fetching post-related data from Firestore.
 * In a real app, you would replace the mock data logic with actual Firestore queries.
 */
import { mockPosts, mockPostStats, mockResources, mockComments, mockUsers } from '@/lib/data/mock-data';
import type { Post, PostStats, Resource, Comment, User } from '@/lib/types';

/**
 * Fetches all posts of type 'interview' and combines them with their stats.
 * This simulates fetching from the 'posts' collection and joining with 'postStats'.
 */
export async function getInterviewPosts(): Promise<(Post & { stats: PostStats; author: User | undefined; })[]> {
  const interviewPosts = mockPosts.filter(p => p.main.type === 'interview');
  
  const enrichedPosts = interviewPosts.map(post => {
    const stats = mockPostStats.find(s => s.postId === post.id);
    const author = mockUsers.find(u => u.id === post.main.authorId);
    return {
      ...post,
      stats: stats || { postId: post.id, likes: 0 },
      author: author,
    };
  });

  return enrichedPosts;
}

/**
 * Fetches the details for a single post.
 * @param id The ID of the post to fetch.
 */
export async function getPostDetails(id: string): Promise<Post | undefined> {
    return mockPosts.find(p => p.id === id);
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
    return mockPosts.filter(p => p.main.authorId === userId && p.main.type === 'interview');
}
