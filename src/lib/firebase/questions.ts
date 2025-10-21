/**
 * This file simulates fetching question-related data from Firestore.
 */
import { mockQuestions, mockPosts } from '@/lib/data/mock-data';
import type { Question } from '@/lib/types';

type QuestionWithCompany = Question & { company: string; interviewId: string };

/**
 * Fetches all questions and enriches them with company data.
 * This simulates fetching from the 'questions' collection and joining with 'posts'.
 */
export async function getAllQuestions(): Promise<QuestionWithCompany[]> {
    return mockQuestions.map(q => {
        const post = mockPosts.find(p => p.id === q.postId);
        return {
            ...q,
            company: post?.companyInfo.company || 'N/A',
            interviewId: q.postId
        }
    });
}
