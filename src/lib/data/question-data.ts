
// This file provides structured data for the UI, derived from mock data.
import { getAllQuestions } from '@/lib/firebase/questions';


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

// The function to get questions for the bank is now in `src/lib/firebase/questions.ts`.
// UI components should call `getAllQuestions()` from there.
