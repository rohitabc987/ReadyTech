import type { User, Interview, Question, Resource, Comment } from './types';
import placeholderData from './placeholder-images.json';

const { placeholderImages } = placeholderData;

const findImage = (id: string) => placeholderImages.find(p => p.id === id)?.imageUrl || '';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Aarav Sharma', email: 'aarav.sharma@iitdh.ac.in', avatarUrl: findImage('user1'), institution: 'IIT Dharwad', graduationYear: 2023, bio: 'SWE at Google. Passionate about algorithms and system design. Happy to mentor folks breaking into tech.', isMentor: true },
  { id: 'u2', name: 'Priya Patel', email: 'priya.patel@nit.ac.in', avatarUrl: findImage('user2'), institution: 'NIT Warangal', graduationYear: 2024, bio: 'Incoming PM at Microsoft. I love talking about product sense and interview prep.', isMentor: true },
  { id: 'u3', name: 'Rohan Desai', email: 'rohan.desai@iitdh.ac.in', avatarUrl: findImage('user3'), institution: 'IIT Dharwad', graduationYear: 2025, bio: 'Aspiring software engineer, currently learning about cloud computing.', isMentor: false },
  { id: 'u4', name: 'Sneha Reddy', email: 'sneha.reddy@nit.ac.in', avatarUrl: findImage('user4'), institution: 'NIT Trichy', graduationYear: 2023, bio: 'Data Scientist at Amazon. My interests include ML, NLP, and sharing knowledge.', isMentor: true },
  { id: 'u5', name: 'Vikram Singh', email: 'vikram.singh@iitdh.ac.in', avatarUrl: findImage('user5'), institution: 'IIT Bombay', graduationYear: 2024, bio: 'Hardware engineer at NVIDIA. Happy to chat about low-level systems.', isMentor: true },
];

export const mockCurrentUser = mockUsers[2];

export const mockQuestions: Question[] = [
  { id: 'q1', question: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.', topic: 'Trees' },
  { id: 'q2', question: 'Explain the difference between a process and a thread.', topic: 'Operating Systems' },
  { id: 'q3', question: 'How would you design a URL shortening service like TinyURL?', topic: 'System Design' },
  { id: 'q4', question: 'Implement a LRU Cache.', topic: 'Data Structures' },
];

export const mockResources: Resource[] = [
    { id: 'r1', title: 'Grokking the System Design Interview', type: 'link', url: '#', description: 'A comprehensive guide to prepare for system design interviews.' },
    { id: 'r2', title: 'CSES Problem Set', type: 'link', url: '#', description: 'A great collection of competitive programming problems.' },
    { id: 'r3', title: 'Google\'s C++ Style Guide', type: 'pdf', url: '#', description: 'Best practices for writing clean and maintainable C++ code.' },
    { id: 'r4', title: 'Fireship.io - 100 Seconds of Code', type: 'video', url: '#', description: 'Quick and concise videos on a variety of tech topics.' },
];

export const mockComments: Comment[] = [
  { id: 'c1', author: mockUsers[1], text: 'This is a great breakdown, thanks for sharing!', date: '2024-05-20T10:30:00Z' },
  { id: 'c2', author: mockUsers[3], text: 'The question about system design was really helpful. I have an interview coming up and this gives me a good starting point.', date: '2024-05-21T14:00:00Z' },
];

export const mockInterviews: Interview[] = [
  {
    id: 'i1',
    title: 'My Interview Experience at Google for SDE-1',
    company: 'Google',
    role: 'SDE-1',
    author: mockUsers[0],
    date: '2024-05-20T09:00:00Z',
    experience: 'The interview process consisted of 1 phone screen and 3 onsite rounds. The phone screen was a medium LeetCode question on arrays. The on-sites covered a range of topics including trees, graphs, and a system design question. Everyone was very friendly and the experience was positive overall. The recruiter was very helpful in guiding me through the process.',
    questions: [mockQuestions[0], mockQuestions[2]],
    resources: [mockResources[0]],
    rating: 4.8,
    comments: mockComments,
  },
  {
    id: 'i2',
    title: 'Microsoft PM Interview - A Deep Dive',
    company: 'Microsoft',
    role: 'Product Manager',
    author: mockUsers[1],
    date: '2024-04-15T14:00:00Z',
    experience: 'The process had 4 rounds. Round 1 was with a PM and focused on product sense. Round 2 was a technical round with an engineer. Round 3 was about behavioral questions and leadership principles. The final round was with a senior director about my past experiences and future goals. Be prepared to talk a lot about "why Microsoft".',
    questions: [],
    resources: [],
    rating: 4.5,
    comments: [],
  },
  {
    id: 'i3',
    title: 'Amazon SDE Intern Interview',
    company: 'Amazon',
    role: 'SDE Intern',
    author: mockUsers[3],
    date: '2024-03-10T11:00:00Z',
    experience: 'It was a 2-round process. First was an online assessment on HackerRank with 2 coding questions and a work-style simulation. The second round was a virtual interview with an SDE-2. We discussed my resume, a coding question on hashmaps, and some of Amazon\'s leadership principles. The coding question was about finding pairs in an array that sum to a target.',
    questions: [mockQuestions[3]],
    resources: [],
    rating: 4.2,
    comments: [],
  },
];
