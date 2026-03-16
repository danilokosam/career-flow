import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/app/providers"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Base URL for resolving relative URLs in metadata
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://career-flow.vercel.app",
  ),

  // Primary title and description for SEO
  title: "Career Flow",
  description: "Modern Job Application Tracker - Organize Your Job Search",

  // Comprehensive keywords for SEO
  keywords: [
    // Core functionality
    "job tracker",
    "job application tracker",
    "job search tracker",
    "job application management",
    "career tracker",
    "job hunt organizer",
    // Technology stack
    "Next.js",
    "Next.js 14",
    "TypeScript",
    "React",
    "PostgreSQL",
    "Prisma ORM",
    "Clerk authentication",
    "React Query",
    "TanStack Query",
    "Radix UI",
    "Tailwind CSS",
    "React Hook Form",
    "Zod validation",
    "Recharts",
    // Features
    "job dashboard",
    "job analytics",
    "job statistics",
    "job search analytics",
    "job application export",
    "CSV export",
    "Excel export",
    "job search management",
    "career management",
    // UI/UX
    "dark mode",
    "responsive design",
    "mobile-friendly",
    "modern UI",
    "beautiful dashboard",
    // Industry
    "job seeker",
    "career development",
    "job hunting",
    "application tracking",
    "interview tracking",
  ],

  // Author information
  authors: [
    {
      name: "Daniel Duarte",
      url: "https://portfolio-2025-dxni.netlify.app//",
    },
  ],
  creator: "Daniel Duarte",

  // Application metadata
  applicationName: "Career Flow",

  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons and favicons - favicon.ico for tab, logo.svg for Apple devices
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.ico",
  },

  // Open Graph metadata (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://career-flow.vercel.app",
    siteName: "Career Flow - Job Application Tracker",
    title:
      "Career Flow | Modern Job Application Tracker - Organize Your Job Search",
    description:
      "Track your job applications, analyze your progress with charts and statistics, and manage your job search journey efficiently. Built with Next.js, TypeScript, Clerk, Prisma, React Query, and Supabase. Free, open-source, and production-ready.",
    images: [
      {
        url: "/main.svg",
        width: 1200,
        height: 630,
        alt: "Career Flow - Modern Job Application Tracking Dashboard",
        type: "image/svg+xml",
      },
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "Career Flow Logo",
        type: "image/svg+xml",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Career Flow | Modern Job Application Tracker",
    description:
      "Track your job applications, analyze your progress, and manage your job search journey efficiently. Built with Next.js 14+, TypeScript, Clerk, Prisma, React Query, and PostgreSQL.",
    creator: "@danilokosam",
    site: "@danilokosam",
    images: [
      {
        url: "/main.svg",
        width: 1200,
        height: 630,
        alt: "Career Flow - Modern Job Application Tracking Dashboard",
      },
    ],
  },

  // Additional metadata
  alternates: {
    canonical: "https://career-flow.vercel.app",
  },
};

/**
 * Root Layout Component
 *
 * This component wraps all pages in the application.
 * It provides the HTML structure and global providers.
 *
 * @param children - All page components and nested layouts
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /**
     * ClerkProvider - Authentication Context
     *
     * Wraps the entire app to provide Clerk authentication functionality.
     * Makes auth() and other Clerk hooks available in all components.
     * Must be a Server Component (no 'use client' directive).
     */
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
      <html lang="en" suppressHydrationWarning>
        {/* 
          suppressHydrationWarning: Prevents React hydration warnings
          This is needed when using theme providers that modify the <html> element
          (e.g., adding "dark" class). The warning occurs because server and client
          may have different initial HTML due to theme detection.
        */}
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* 
            Providers Component
            - ThemeProvider: Dark/light mode
            - QueryClientProvider: React Query
            - Toaster: Toast notifications
          */}
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
