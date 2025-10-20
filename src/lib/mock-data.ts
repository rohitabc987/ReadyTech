import type { User, Post, Question, Resource, Comment, Testimonial, PostStats } from './types';
import placeholderData from './placeholder-images.json';

const { placeholderImages } = placeholderData;

const findImage = (id: string) => placeholderImages.find(p => p.id === id)?.imageUrl || '';

export const mockUsers: User[] = [
  {
    id: 'u1',
    personal: {
      name: 'Aarav Sharma',
      email: 'aarav.sharma@iitdh.ac.in',
      avatarUrl: findImage('user1'),
      bio: 'SWE at Google. Passionate about algorithms and system design. Happy to mentor folks breaking into tech.',
      createdAt: new Date('2022-08-15T10:00:00Z'),
    },
    academics: {
      role: 'mentor',
      institution: 'IIT',
      branch: 'Computer Science',
      graduationYear: 2023,
      domainVerified: true,
    },
    expertise: {
      expertiseAreas: ['DSA', 'System Design'],
    },
    social: {},
    preferences: {},
  },
  {
    id: 'u2',
    personal: {
      name: 'Priya Patel',
      email: 'priya.patel@nit.ac.in',
      avatarUrl: findImage('user2'),
      bio: 'Incoming PM at Microsoft. I love talking about product sense and interview prep.',
      createdAt: new Date('2022-09-01T11:00:00Z'),
    },
    academics: {
      role: 'mentor',
      institution: 'NIT',
      branch: 'Electronics and Communication',
      graduationYear: 2024,
      domainVerified: true,
    },
    expertise: {
      expertiseAreas: ['Product Management', 'Interview Prep'],
    },
    social: {},
    preferences: {},
  },
  {
    id: 'u3',
    personal: {
      name: 'Rohan Desai',
      email: 'rohan.desai@iitdh.ac.in',
      avatarUrl: findImage('user3'),
      bio: 'Aspiring software engineer, currently learning about cloud computing.',
      createdAt: new Date('2023-01-20T12:00:00Z'),
    },
    academics: {
      role: 'learner',
      institution: 'IIT',
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
    personal: {
      name: 'Sneha Reddy',
      email: 'sneha.reddy@nit.ac.in',
      avatarUrl: findImage('user4'),
      bio: 'Data Scientist at Amazon. My interests include ML, NLP, and sharing knowledge.',
      createdAt: new Date('2022-07-10T14:00:00Z'),
    },
    academics: {
      role: 'mentor',
      institution: 'NIT',
      branch: 'Computer Science',
      graduationYear: 2023,
      domainVerified: true,
    },
    expertise: {
      expertiseAreas: ['Machine Learning', 'NLP', 'Data Science'],
    },
    social: {},
    preferences: {},
  },
  {
    id: 'u5',
    personal: {
      name: 'Vikram Singh',
      email: 'vikram.singh@iitdh.ac.in',
      avatarUrl: findImage('user5'),
      bio: 'Hardware engineer at NVIDIA. Happy to chat about low-level systems.',
      createdAt: new Date('2022-06-15T15:00:00Z'),
    },
    academics: {
      role: 'mentor',
      institution: 'IIT',
      branch: 'Electrical Engineering',
      graduationYear: 2024,
      domainVerified: true,
    },
    expertise: {
      expertiseAreas: ['Hardware', 'Embedded Systems'],
    },
    social: {},
    preferences: {},
  },
];

export const mockCurrentUser = mockUsers[2];

export const mockPosts: Post[] = [
  {
    id: 'i1',
    main: {
        authorId: 'u1',
        type: 'interview',
        title: 'My Interview Experience at Google for SDE-1',
        description: 'The interview process consisted of 1 phone screen and 3 onsite rounds. The phone screen was a medium LeetCode question on arrays. The on-sites covered a range of topics including trees, graphs, and a system design question. Everyone was very friendly and the experience was positive overall. The recruiter was very helpful in guiding me through the process.',
        createdAt: new Date('2024-05-20T09:00:00Z'),
        updatedAt: new Date('2024-05-20T09:00:00Z'),
    },
    companyInfo: {
        company: 'Google',
        role: 'SDE-1',
        applicationType: 'Full-Time',
        result: 'Selected',
    },
    content: {},
  },
  {
    id: 'i2',
    main: {
        authorId: 'u2',
        type: 'interview',
        title: 'Microsoft PM Interview - A Deep Dive',
        description: 'The process had 4 rounds. Round 1 was with a PM and focused on product sense. Round 2 was a technical round with an engineer. Round 3 was about behavioral questions and leadership principles. The final round was with a senior director about my past experiences and future goals. Be prepared to talk a lot about "why Microsoft".',
        createdAt: new Date('2024-04-15T14:00:00Z'),
        updatedAt: new Date('2024-04-15T14:00:00Z'),
    },
    companyInfo: {
        company: 'Microsoft',
        role: 'Product Manager',
        applicationType: 'Full-Time',
        result: 'Selected',
    },
    content: {},
  },
  {
    id: 'i3',
    main: {
        authorId: 'u4',
        type: 'interview',
        title: 'Amazon SDE Intern Interview',
        description: 'It was a 2-round process. First was an online assessment on HackerRank with 2 coding questions and a work-style simulation. The second round was a virtual interview with an SDE-2. We discussed my resume, a coding question on hashmaps, and some of Amazon\'s leadership principles. The coding question was about finding pairs in an array that sum to a target.',
        createdAt: new Date('2024-03-10T11:00:00Z'),
        updatedAt: new Date('2024-03-10T11:00:00Z'),
    },
    companyInfo: {
        company: 'Amazon',
        role: 'SDE Intern',
        applicationType: 'Internship',
        result: 'Selected',
    },
    content: {},
  },
];

export const mockQuestions: Question[] = [
  { id: 'q1', postId: 'i1', text: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.', topic: 'Trees', type: 'Coding', difficulty: 'Medium' },
  { id: 'q2', postId: 'i1', text: 'How would you design a URL shortening service like TinyURL?', topic: 'System Design', type: 'Technical', difficulty: 'Hard' },
  { id: 'q3', postId: 'i3', text: 'Implement a LRU Cache.', topic: 'Data Structures', type: 'Coding', difficulty: 'Medium' },
  { id: 'q4', postId: 'i2', text: 'Explain the difference between a process and a thread.', topic: 'Operating Systems', type: 'Technical', difficulty: 'Easy' },
];

export const mockResources: Resource[] = [
    { id: 'r1', postId: 'i1', title: 'Grokking the System Design Interview', type: 'link', url: '#', description: 'A comprehensive guide to prepare for system design interviews.' },
    { id: 'r2', postId: 'i2', title: 'CSES Problem Set', type: 'link', url: '#', description: 'A great collection of competitive programming problems.' },
    { id: 'r3', postId: 'i3', title: 'Google\'s C++ Style Guide', type: 'pdf', url: '#', description: 'Best practices for writing clean and maintainable C++ code.' },
    { id: 'r4', postId: 'i3', title: 'Fireship.io - 100 Seconds of Code', type: 'video', url: '#', description: 'Quick and concise videos on a variety of tech topics.' },
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
    }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Ananya Singh',
    institution: 'IIT Delhi',
    avatarImageId: 'testimonial1',
    avatarFallback: 'AS',
    rating: 5,
    quote: '"The interview experiences on ReadyTech were a game-changer for my placement preparation. Invaluable insights!"',
  },
  {
    id: 't2',
    name: 'Rohan Verma',
    institution: 'NIT Trichy',
    avatarImageId: 'testimonial2',
    avatarFallback: 'RV',
    rating: 5,
    quote: '"Connecting with a mentor helped me build a clear roadmap for my career. Highly recommend this platform."',
  },
  {
    id: 't3',
    name: 'Sneha Kumar',
    institution: 'JEE Aspirant',
    avatarImageId: 'testimonial3',
    avatarFallback: 'SK',
    rating: 5,
    quote: '"The question bank is amazing for JEE prep. The \'Coming Soon\' for school students has me excited for more features!"',
  },
  {
    id: 't4',
    name: 'Aarav Sharma',
    institution: 'IIT Bombay',
    avatarImageId: 'user1',
    avatarFallback: 'AS',
    rating: 5,
    quote: '"A fantastic platform for finding mentors and getting real interview advice. Changed my prep entirely."',
  },
  {
    id: 't5',
    name: 'Surabh Kumar',
    institution: 'IIT Kanpur',
    avatarImageId: 'testimonial2',
    avatarFallback: 'SK',
    rating: 5,
    quote: '"The question bank is amazing for JEE prep. The \'Coming Soon\' for school students has me excited for more features!"',
  },

];
