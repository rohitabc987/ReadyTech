
import { mockPosts, mockQuestions } from '@/lib/data/mock-data';

// This file provides structured data for the UI, derived from mock data.

// Since questions are now in their own collection, we can use them directly.
// We map over them to add the company name for display purposes.
export const uniqueQuestions = mockQuestions.map(q => {
    const post = mockPosts.find(p => p.id === q.postId);
    return {
        ...q,
        company: post?.companyInfo.company || 'N/A',
        interviewId: q.postId
    }
});


// Static list of topics for filtering.
export const topics: string[] = [
    "Arrays",
    "Strings",
    "Linked Lists",
    "Trees",
    "Graphs",
    "Dynamic Programming",
    "System Design",
    "Operating Systems",
    "Databases",
    "Product Sense",
    "Behavioral"
];

// Static list of companies for filtering.
export const companies: string[] = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "Netflix",
    "Uber",
    "Airbnb",
    "Atlassian"
];
