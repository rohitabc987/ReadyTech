# ReadyTech Contribution Guidelines

Welcome! To ensure consistency and maintain a high-quality codebase, please adhere to the following guidelines for all contributions.

## 1. Technology Stack

All development must align with the official technology stack. Do not introduce new frameworks or libraries without prior approval.

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: React, ShadCN UI
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore)
- **Generative AI**: Genkit

## 2. Folder Structure

Organize files according to the established conventions to keep the project maintainable.

- `src/app/`: All pages and routes. Each page should be in its own folder with a `page.tsx` file.
- `src/components/`: Reusable React components.
    - `src/components/ui/`: Core, unstyled UI elements provided by ShadCN.
    - `src/components/`: Application-specific composite components.
- `src/lib/`: Core utilities, type definitions, and mock data.
    - `src/lib/utils.ts`: General utility functions (e.g., `cn` for classnames).
    - `src/lib/types.ts`: Global TypeScript type definitions.
    - `src/lib/mock-data.ts`: Mock data for UI development.
- `src/firebase/`: Firebase configuration and interaction logic (e.g., initialization, hooks).
- `src/hooks/`: Custom React hooks.
- `src/ai/`: All Genkit-related code, including flows and prompts.

## 3. UI and Styling Rules

A consistent visual identity is crucial.

- **Component Library**: **Always** prefer using components from **ShadCN UI** (`@/components/ui`) when a suitable one exists. Do not build custom components for elements like buttons, cards, or inputs if a ShadCN equivalent is available.
- **Styling**: Use **Tailwind CSS** for all styling. Avoid writing plain CSS or using CSS-in-JS libraries.
- **Layout**: Use flexbox and grid for layouts. Ensure all layouts are responsive and work well on mobile, tablet, and desktop screens.
- **Color Palette**: Adhere strictly to the color palette defined as CSS variables in `src/app/globals.css`. Use semantic variable names like `var(--primary)`, `var(--background)`, etc., instead of hardcoding hex values.
- **Icons**: Use icons exclusively from the `lucide-react` library to maintain visual consistency.
- **Fonts**: Use the established project fonts: `Poppins` for headlines and `Inter` for body text.

## 4. Data Handling

Follow Next.js best practices for data management to ensure performance and security.

- **Data Fetching**: Use **React Server Components** (the default in the App Router) for fetching data from Firestore. This keeps data-fetching logic on the server, reducing the client-side bundle size.
- **Data Mutations**: Use the **Firebase Client-Side SDK** (`firebase/firestore`) for all data creation, update, and deletion operations.
    - All mutation logic must be inside a **Client Component** (marked with `'use client'`).
    - Mutations should be triggered by user interactions (e.g., `onClick` on a button, `onSubmit` on a form), not in `useEffect` hooks.
- **Authentication**: User state should be managed via Firebase Authentication and accessed through the provided hooks.
