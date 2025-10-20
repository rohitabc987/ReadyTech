import { mockPosts } from '@/lib/mock-data';

// This file processes raw post data to extract structured information for the UI.

// Extract all questions from all interviews, adding company and interview context.
const allQuestions = mockPosts.flatMap(interview => 
    (interview.content.questions || []).map(q => ({
        ...q,
        company: interview.companyInfo.company,
        interviewId: interview.id
    }))
);

// Create a unique list of questions based on the question text to avoid duplicates.
export const uniqueQuestions = Array.from(new Map(allQuestions.map(q => [q.text, q])).values());

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
