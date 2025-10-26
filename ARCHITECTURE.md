# ReadyTech Architecture

This document outlines the technical architecture, database structure, and development workflow for the ReadyTech platform.

## 1. Core Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Framework**: [React](https://reactjs.org/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend Services**: [Firebase](https://firebase.google.com/)
    - **Authentication**: Firebase Authentication (Google Sign-In)
    - **Database**: Firestore
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit)

## 2. Navigation

The application uses a header-only navigation system. The main header, located in `src/components/header.tsx`, contains all primary navigation links. There is no sidebar. This ensures a consistent and simple user experience across all devices. All pages within the main application layout have consistent horizontal padding managed by a container element.

## 3. Firestore Database Structure

The database is structured into top-level collections for core entities like users and posts.

### `/users/{userId}`

This collection stores all user-related information, organized into sub-objects.

- **Path**: `/users/{userId}`
- **`userId`**: The UID from Firebase Authentication.

**Schema: `User`**
```typescript
{
  "id": "string", // User's UID from Firebase Auth
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp"
  "personal": {
    "name": "string",
    "email": "string", // Verified institute email
    "avatarUrl": "string",
    "mobile": "string",
    "bio": "string",
  },
  "academics": {
    "role": "'mentor' | 'learner'",
    "institutionType": "string",
    "institution": "'IIT' | 'NIT' | 'IIIT' | 'Private' | 'School'",
    "branch": "string",
    "graduationYear": "number",
    "domainVerified": "boolean"
  },
  "expertise": {
    "expertiseAreas": "string" // e.g., "DSA, System Design"
  },
  "social": {
    "linkedin": "string",
    "github": "string",
    "youtube": "string"
  },
  "preferences": {
    "notificationsEnabled": "boolean",
    "darkMode": "boolean"
  }
}
```

### `/posts/{postId}`

This collection stores all types of content, including interviews, resources, and questions, using a flexible structure.

- **Path**: `/posts/{postId}`
- **`postId`**: A unique, auto-generated ID.

**Schema: `Post`**
```typescript
{
  "id": "string",
  "main": {
    "authorId": "string", // Reference to users/{userId}
    "type": "'interview' | 'resource' | 'mock' | 'question'",
    "title": "string",
    "description": "string",
    "coverImage": "string",
    "createdAt": "Timestamp",
    "updatedAt": "Timestamp"
  },
  "companyInfo": {
    "company": "string",
    "role": "string",
    "year": "string",
    "difficulty": "'easy' | 'medium' | 'hard'",
    "applicationType": "'Internship' | 'Full-Time' | 'Internship + FTE'",
    "result": "'Selected' | 'Rejected' | 'In Process'"
  },
  "content": {
    "questions": [
      { "text": "string", "isMCQ": "boolean", "options": [{ "text": "string" }], "difficulty": "'Easy' | 'Medium' | 'Hard'", "type": "'Coding' | 'Technical' | 'HR'", "topic": "string" }
    ],
    "resources": [
      { "id": "string", "title": "string", "url": "string", "type": "'pdf'|'video'|'link'" }
    ]
  },
  "stats": {
    "views": "number",
    "likes": "number",
    "comments": "Comment[]", // Typically a subcollection: /posts/{postId}/comments
    "avgRating": "number",
    "ratingsCount": "number",
    "upvotes": "number"
  }
}
```

### `/feedback/{feedbackId}`

A root-level collection to store user feedback.

**Schema: `Feedback`**
```typescript
{
  "id": "string",      // Can be user's email or auto-generated ID
  "content": "string",
  "createdAt": "Timestamp"
}
```

## 4. Feature Development Workflow

To maintain consistency and code quality, new features should be developed following this standard process:

1.  **Define/Update Types**: If the feature involves new or modified data structures, update the relevant TypeScript types in `src/lib/types.ts` and the schemas in this architecture document.
2.  **Create UI Components**: Build the necessary React components for the feature. Place reusable components in `src/components/ui/` (for generic elements) or `src/components/` (for feature-specific composites). The page itself will reside in `src/app/`.
3.  **Ensure Responsiveness**: All UI components and pages must be fully responsive, providing a seamless experience on mobile, tablet, and desktop devices. Use Tailwind CSS's responsive prefixes (e.g., `sm:`, `md:`, `lg:`) to adapt layouts.
4.  **Implement Data Logic**:
    - **Data Fetching**: Use Server Components by default to fetch data directly from Firestore. This improves performance by running data queries on the server.
    - **Data Mutations**: For creating, updating, or deleting data, use Firebase's client-side SDK (`firebase/firestore`) within client components (`'use client'`). Trigger these mutations based on user interactions like button clicks or form submissions.
5.  **Connect UI to Logic**: Integrate the data fetching and mutation logic into the UI components to create a fully functional feature. Ensure proper loading states, error handling, and user feedback (e.g., using toasts).
