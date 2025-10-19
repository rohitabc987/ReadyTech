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

## 2. Firestore Database Structure

The database is structured into top-level collections for core entities like users and posts.

### `/users/{userId}`

This collection stores public-facing user profile information.

- **Path**: `/users/{userId}`
- **`userId`**: The UID from Firebase Authentication.

**Schema: `UserProfile`**
```typescript
{
  "uid": "string",             // Firebase Auth User ID
  "name": "string",            // User's full name
  "email": "string",           // User's institutional email (verified)
  "avatarUrl": "string",       // URL for the user's profile picture
  "institution": "string",     // Name of the college/university
  "graduationYear": "number",  // e.g., 2025
  "bio": "string",             // A short user biography
  "isMentor": "boolean"        // Flag indicating if the user is available for mentorship
}
```

### `/posts/{postId}`

This collection stores all interview experiences and mentorship profiles created by users.

- **Path**: `/posts/{postId}`
- **`postId`**: A unique, auto-generated ID.

**Schema: `Post`**
```typescript
{
  "id": "string",                      // The unique document ID
  "type": "'interview' | 'mentorship'",// Type of the post
  "title": "string",                   // Post title
  "authorId": "string",                // UID of the user who created it (links to /users/{userId})
  "createdAt": "Timestamp",            // Firestore server timestamp of creation
  "updatedAt": "Timestamp",            // Firestore server timestamp of last update
  
  // Fields specific to 'interview' type
  "company": "string",                 // Company name (e.g., "Google")
  "role": "string",                    // Role (e.g., "Software Engineer Intern")
  "experience": "string",              // Detailed description of the interview experience
  "questions": [                       // Array of questions asked
    { "id": "string", "question": "string", "topic": "string" }
  ],
  "resources": [                       // Array of helpful resources
    { "id": "string", "title": "string", "url": "string", "type": "'pdf'|'video'|'link'" }
  ],

  // Subcollections are preferred for scalability
  // /posts/{postId}/comments/{commentId}
  // /posts/{postId}/ratings/{userId}
}
```
**Subcollection: `/posts/{postId}/comments`**
- **Schema: `Comment`**
```typescript
{
  "authorId": "string",
  "text": "string",
  "createdAt": "Timestamp"
}
```

## 3. Feature Development Workflow

To maintain consistency and code quality, new features should be developed following this standard process:

1.  **Define/Update Types**: If the feature involves new or modified data structures, update the relevant TypeScript types in `src/lib/types.ts` and the schemas in this architecture document.
2.  **Create UI Components**: Build the necessary React components for the feature. Place reusable components in `src/components/ui/` (for generic elements) or `src/components/` (for feature-specific composites). The page itself will reside in `src/app/`.
3.  **Implement Data Logic**:
    - **Data Fetching**: Use Server Components by default to fetch data directly from Firestore. This improves performance by running data queries on the server.
    - **Data Mutations**: For creating, updating, or deleting data, use Firebase's client-side SDK (`firebase/firestore`) within client components (`'use client'`). Trigger these mutations based on user interactions like button clicks or form submissions.
4.  **Connect UI to Logic**: Integrate the data fetching and mutation logic into the UI components to create a fully functional feature. Ensure proper loading states, error handling, and user feedback (e.g., using toasts).
