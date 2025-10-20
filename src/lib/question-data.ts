import { mockPosts } from '@/lib/mock-data';

const allQuestions = mockPosts.flatMap(interview => 
    (interview.content.questions || []).map(q => ({
        ...q,
        company: interview.companyInfo.company,
        interviewId: interview.id
    }))
);

// Deduplicate questions by question text
export const uniqueQuestions = Array.from(new Map(allQuestions.map(q => [q.text, q])).values());

export const topics = Array.from(new Set(uniqueQuestions.map(q => q.topic).filter(Boolean))) as string[];
export const companies = Array.from(new Set(uniqueQuestions.map(q => q.company).filter(Boolean))) as string[];
