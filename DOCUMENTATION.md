# Henna Touch Project Documentation

This document provides a comprehensive overview of the Henna Touch project, including its file structure, technology stack, and guides on how to make common changes.

## 1. Project Overview

**Henna Touch** is a web application for a Mehndi Artist, built with modern web technologies to ensure performance, SEO, and a premium user experience.

### Technology Stack
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Authentication**: Basic Auth (for Admin panel)

## 2. File Structure

Here is a breakdown of the key directories and files in the project:

```
e:/henna touch/
├── app/                    # Main application code (Next.js App Router)
│   ├── admin/              # Admin dashboard pages (Protected)
│   ├── components/         # Reusable UI components (Navbar, Footer, Forms)
│   ├── fonts/              # Custom fonts
│   ├── lib/                # Utility functions and Supabase client
│   ├── actions.ts          # Server Actions (form submissions, tracking)
│   ├── globals.css         # Global styles and Tailwind directives
│   ├── layout.tsx          # Root layout (Html, Body, Navbar, Footer)
│   └── page.tsx            # Home page
├── public/                 # Static assets (images, icons)
├── supabase/               # Database related files
│   └── schema.sql          # SQL script for database schema
├── middleware.ts           # Middleware for route protection (Admin Auth)
├── package.json            # Project dependencies and scripts
└── tailwind.config.ts      # Tailwind CSS configuration
```

### Key Files Explained
- **`app/page.tsx`**: The main landing page of the website.
- **`app/layout.tsx`**: The main wrapper for all pages. Includes the Navbar and Footer.
- **`app/actions.ts`**: Contains server-side logic for handling form submissions (bookings) and tracking user interactions (WhatsApp clicks).
- **`middleware.ts`**: Handles security. It checks if a user is trying to access `/admin` and enforces Basic Authentication.
- **`app/lib/supabase.ts`** (assumed): Initializes the Supabase client for database connectivity.

## 3. How to Make Changes

### A. Modifying Content on Pages
To change text, images, or layout on the website:
1. Navigate to `app/`.
2. Open the relevant page file (e.g., `page.tsx` for Home, `app/services/page.tsx` for Services).
3. Edit the JSX content. Tailwind classes can be changed in the `className` attribute.

### B. Creating a New Component
1. Go to `app/components/`.
2. Create a new file, e.g., `NewFeature.tsx`.
3. Define your component:
   ```tsx
   export default function NewFeature() {
       return (
           <div className="p-4 bg-white">
               <h2>New Feature</h2>
           </div>
       );
   }
   ```
4. Import and use it in a page: `import NewFeature from '@/app/components/NewFeature'`.

### C. Updating the Database Schema
1. The source of truth for your database structure is `supabase/schema.sql`.
2. If you want to add a new table or column:
   - Edit `supabase/schema.sql` to verify the design.
   - Run the SQL command in your Supabase Dashboard (SQL Editor) to apply the change.
   - **Note**: Editing the file locally does not automatically update the live database.

### D. Changing Admin Credentials
The admin panel is protected by Basic Auth.
1. Open `middleware.ts` (or check `.env.local` if used).
2. The credentials are checked against `process.env.ADMIN_USER` and `process.env.ADMIN_PASS`.
3. Update these values in your `.env.local` file (not committed to Git) to change the login.
   ```
   ADMIN_USER=newuser
   ADMIN_PASS=newpassword
   ```

### E. Styling Changes
- **Global Styles**: Edit `app/globals.css`.
- **Component Styles**: Add/remove Tailwind classes directly in the component files.
- **Theme Configuration**: Edit `tailwind.config.ts` to add custom colors, fonts, or animations.

## 4. Running the Project

**Development Mode:**
```bash
npm run dev
```
Runs the app at `http://localhost:3000`.

**Build for Production:**
```bash
npm run build
npm start
```

## 5. Deployment
This project is optimized for deployment on Vercel. Connect your GitHub repository to Vercel for automatic deployments. ensure your Supabase environment variables are added to the Vercel project settings.
