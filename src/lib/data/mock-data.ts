
import type { User, Post, Question, Resource, Comment, PostStats } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    createdAt: new Date('2022-08-15T10:00:00Z'),
    updatedAt: new Date('2024-07-20T10:00:00Z'),
    personal: {
      name: 'Aarav Sharma',
      email: 'aarav.sharma@iitdh.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA4MzQ4MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'SWE at Google. Passionate about algorithms and system design. Happy to mentor folks breaking into tech.',
    },
    academics: {
      role: 'mentor',
      institution: 'IIT Bombay',
      branch: 'Computer Science',
      graduationYear: 2023,
      domainVerified: true,
    },
    expertise: {
      expertiseAreas: 'DSA, System Design',
    },
    social: {},
    preferences: {},
  },
  {
    id: 'u2',
    createdAt: new Date('2022-09-01T11:00:00Z'),
    updatedAt: new Date(),
    personal: {
      name: 'Priya Patel',
      email: 'priya.patel@nit.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc2MDgzNjQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Incoming PM at Microsoft. I love talking about product sense and interview prep.',
    },
    academics: {
      role: 'mentor',
      institution: 'NIT Warangal',
      branch: 'Electronics and Communication',
      graduationYear: 2024,
      domainVerified: true,
    },
    expertise: {
      expertiseAreas: 'Product Management, Interview Prep',
    },
    social: {},
    preferences: {},
  },
  {
    id: 'u3',
    createdAt: new Date('2023-01-20T12:00:00Z'),
    updatedAt: new Date('2024-07-28T12:00:00Z'), // Last updated a few days ago
    personal: {
      name: 'Rohan Desai',
      email: 'rohan.desai@iitdh.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA4MzQ4MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Aspiring software engineer, currently learning about cloud computing.',
    },
    academics: {
      role: 'learner',
      institution: 'IIT Dharwad',
      branch: 'Mechanical Engineering',
      graduationYear: 2025,
      domainVerified: true,
    },
    expertise: {},
    social: {},
    preferences: {},
  },
  {
    id: 'u4',
    createdAt: new Date('2022-07-10T14:00:00Z'),
    personal: {
      name: 'Sneha Reddy',
      email: 'sneha.reddy@nit.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwwfHx8fDE3NjA4MzE4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Data Scientist at Amazon. My interests include ML, NLP, and sharing knowledge.',
    },
    academics: {
      role: 'mentor',
      institution: 'NIT Surathkal',
      branch: 'Computer Science',
      graduationYear: 2023,
      domainVerified: true,
    },
    expertise: {
      expertiseAreas: 'Machine Learning, NLP, Data Science',
    },
    social: {},
    preferences: {},
  },
  {
    id: 'u5',
    createdAt: new Date('2022-06-15T15:00:00Z'),
    personal: {
      name: 'Vikram Singh',
      email: 'vikram.singh@iitdh.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA4MzQ4MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Hardware engineer at NVIDIA. Happy to chat about low-level systems.',
    },
    academics: {
      role: 'mentor',
      institution: 'IIT Roorkee',
      branch: 'Electrical Engineering',
      graduationYear: 2024,
      domainVerified: true,
    },
    expertise: {
      expertiseAreas: 'Hardware, Embedded Systems',
    },
    social: {},
    preferences: {},
  },
];

export const mockCurrentUser = mockUsers[2];

export const mockPosts: Post[] = [
  {
    id: 'i1',
    updatedAt: new Date('2024-05-20T09:00:00Z'),
    main: {
        authorId: 'u1',
        authorName: 'Aarav Sharma',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA4MzQ4MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'Technical Interview',
        title: 'My Interview Experience at Google for SDE-1',
        description: 'The interview process consisted of 1 phone screen and 3 onsite rounds. The phone screen was a medium LeetCode question on arrays. The on-sites covered a range of topics including trees, graphs, and a system design question. Everyone was very friendly and the experience was positive overall. The recruiter was very helpful in guiding me through the process.',
        createdAt: new Date('2024-05-20T09:00:00Z'),
        company: 'Google',
        role: 'SDE-1',
        institution: 'IIT Bombay',
    },
    companyInfo: {
        applicationType: 'Full-Time',
        result: 'Selected',
    },
    content: {},
  },
  {
    id: 'i2',
    updatedAt: new Date('2024-04-15T14:00:00Z'),
    main: {
        authorId: 'u2',
        authorName: 'Priya Patel',
        authorAvatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc2MDgzNjQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'Managerial Interview',
        title: 'Microsoft PM Interview - A Deep Dive',
        description: 'The process had 4 rounds. Round 1 was with a PM and focused on product sense. Round 2 was a technical round with an engineer. Round 3 was about behavioral questions and leadership principles. The final round was with a senior director about my past experiences and future goals. Be prepared to talk a lot about "why Microsoft".',
        createdAt: new Date('2024-04-15T14:00:00Z'),
        company: 'Microsoft',
        role: 'Product Manager',
        institution: 'NIT Warangal',
    },
    companyInfo: {
        applicationType: 'Full-Time',
        result: 'Selected',
    },
    content: {},
  },
  {
    id: 'i3',
    updatedAt: new Date('2024-03-10T11:00:00Z'),
    main: {
        authorId: 'u4',
        authorName: 'Sneha Reddy',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwwfHx8fDE3NjA4MzE4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'Online Assessment',
        title: 'Amazon SDE Intern Online Assessment',
        description: 'It was a 2-part online assessment on HackerRank. Part 1 had 2 coding questions (1 easy, 1 medium) and a work-style simulation. Part 2 was a technical quiz on core CS fundamentals. The coding questions were about finding pairs in an array that sum to a target, and a variation of the balanced parentheses problem.',
        createdAt: new Date('2024-03-10T11:00:00Z'),
        company: 'Amazon',
        role: 'SDE Intern',
        institution: 'NIT Surathkal',
    },
    companyInfo: {
        applicationType: 'Internship',
        result: 'Selected',
    },
    content: {},
  },
    {
    id: 'i4',
    updatedAt: new Date('2024-06-01T11:00:00Z'),
    main: {
        authorId: 'u3',
        authorName: 'Rohan Desai',
        authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjA4MzQ4MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'Technical Interview',
        title: 'My First Technical Interview Experience',
        description: 'This was for a startup. They asked two DSA questions. One was on strings and the other on hashmaps. I was able to solve one completely and the other partially. The interviewer was really helpful and gave hints.',
        createdAt: new Date('2024-06-01T11:00:00Z'),
        company: 'A Startup',
        role: 'SDE Intern',
        institution: 'IIT Dharwad',
    },
    companyInfo: {
        applicationType: 'Internship',
        result: 'In Process',
    },
    content: {},
  },
];

export const mockQuestions: Question[] = [
  { id: 'q1', postId: 'i1', text: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.', topic: 'Trees', type: 'Coding', difficulty: 'Medium', isMCQ: false },
  { id: 'q2', postId: 'i1', text: 'How would you design a URL shortening service like TinyURL?', topic: 'System Design', type: 'Technical', difficulty: 'Hard', isMCQ: false },
  { id: 'q3', postId: 'i3', text: 'Implement a LRU Cache.', topic: 'Data Structures', type: 'Coding', difficulty: 'Medium', isMCQ: false },
  { id: 'q4', postId: 'i2', text: 'Explain the difference between a process and a thread.', topic: 'Operating Systems', type: 'Technical', difficulty: 'Easy', isMCQ: false },
];

export const mockResources: Resource[] = [
    { id: 'r1', postId: 'i1', title: 'Grokking the System Design Interview', type: 'link', url: '#', description: 'A comprehensive guide to prepare for system design interviews.', topic: 'System Design' },
    { id: 'r2', postId: 'i2', title: 'CSES Problem Set', type: 'link', url: '#', description: 'A great collection of competitive programming problems.', topic: 'Algorithms' },
    { id: 'r3', postId: 'i3', title: 'Google\'s C++ Style Guide', type: 'pdf', url: '#', description: 'Best practices for writing clean and maintainable C++ code.', topic: 'Data Structures' },
    { id: 'r4', postId: 'i3', title: 'Fireship.io - 100 Seconds of Code', type: 'video', url: '#', description: 'Quick and concise videos on a variety of tech topics.', topic: 'Data Structures' },
];

export const mockComments: Comment[] = [
  { id: 'c1', postId: 'i1', authorId: 'u2', text: 'This is a great breakdown, thanks for sharing!', createdAt: new Date('2024-05-20T10:30:00Z') },
  { id: 'c2', postId: 'i1', authorId: 'u4', text: 'The question about system design was really helpful. I have an interview coming up and this gives me a good starting point.', createdAt: new Date('2024-05-21T14:00:00Z') },
];

export const mockPostStats: PostStats[] = [
    {
        postId: 'i1',
        views: 1250,
        likes: 150,
        commentsCount: mockComments.filter(c => c.postId === 'i1').length,
        avgRating: 4.8,
        ratingsCount: 42,
    },
    {
        postId: 'i2',
        views: 980,
        likes: 120,
        commentsCount: mockComments.filter(c => c.postId === 'i2').length,
        avgRating: 4.5,
        ratingsCount: 35,
    },
    {
        postId: 'i3',
        views: 2100,
        likes: 250,
        commentsCount: mockComments.filter(c => c.postId === 'i3').length,
        avgRating: 4.2,
        ratingsCount: 60,
    },
    {
        postId: 'i4',
        views: 150,
        likes: 25,
        commentsCount: 0,
        avgRating: 4.0,
        ratingsCount: 5,
    }
];
