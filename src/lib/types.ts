export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  institution: string;
  graduationYear: number;
  bio: string;
  isMentor: boolean;
};

export type Interview = {
  id: string;
  title: string;
  company: string;
  role: string;
  author: User;
  date: string;
  experience: string;
  questions: Question[];
  resources: Resource[];
  rating: number;
  comments: Comment[];
};

export type Question = {
  id: string;
  question: string;
  topic: string;
};

export type Resource = {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link';
  url: string;
  description: string;
};

export type Comment = {
  id: string;
  author: User;
  text: string;
  date: string;
};
