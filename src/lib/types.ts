
export type UserPersonal = {
  name: string;
  email: string; // verified institute email
  avatarUrl?: string;
  mobile?: string;
  bio?: string;
  createdAt: Date;
  updatedAt?: Date;
};

export type UserAcademics = {
  role: 'mentor' | 'learner';
  institutionType?: string;
  institution?: 'IIT' | 'NIT' | 'IIIT' | 'Private' | 'School';
  branch?: string;
  graduationYear?: number;
  domainVerified: boolean;
};

export type UserExpertise = {
  expertiseAreas?: string[]; // e.g. ["DSA", "System Design", "AI"]
};

export type UserSocial = {
  linkedin?: string;
  github?: string;
  youtube?: string;
};

export type UserPreferences = {
  notificationsEnabled?: boolean;
  darkMode?: boolean;
};

export type User = {
  id: string;
  personal: UserPersonal;
  academics: UserAcademics;
  expertise: UserExpertise;
  social: UserSocial;
  preferences: UserPreferences;
};

export type PostMain = {
  authorId: string; // reference to users/{userId}
  type: 'interview' | 'resource' | 'mock' | 'question';
  title: string;
  description: string;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostCompanyInfo = {
  company?: string;
  role?: string;
  year?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  applicationType: 'Internship' | 'Full-Time'| 'Internship + FTE';
  result: 'Selected' | 'Rejected' | 'In Process';
};

export type PostContent = {
  questions?: Question[];
  resources?: Resource[];
};

export type PostStats = {
  views: number;
  likes: number;
  comments: Comment[];
  avgRating?: number;
  ratingsCount?: number;
  upvotes?: number;
};

export type Post = {
  id: string;
  main: PostMain;
  companyInfo: PostCompanyInfo;
  content: PostContent;
  stats: PostStats;
};

export type Question = {
  text: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  type?: 'Coding' | 'Technical' | 'HR';
  topic?: string;
};

export type Resource = {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link';
  url: string;
  description?: string;
};

export type Comment = {
  id: string;
  authorId: string; // reference to users/{userId}
  text: string;
  createdAt: Date;
};

export type Feedback = {
  id: string; // email id of user
  content: string;
};
