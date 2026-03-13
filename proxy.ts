/**
 * Next.js Middleware - Authentication Protection
 *
 * This middleware runs on every request before the page renders.
 * It protects routes that require authentication using Clerk.
 *
 * How it works:
 * 1. Middleware intercepts all requests matching the config.matcher pattern
 * 2. Checks if the requested route is in the protected routes list
 * 3. If protected, verifies user is authenticated via Clerk
 * 4. If not authenticated, Clerk redirects to sign-in page
 * 5. If authenticated, request proceeds to the page
 *
 * Key Benefits:
 * - Server-side protection (runs before page loads)
 * - Automatic redirect to login for unauthenticated users
 * - No need to check auth in every page component
 */

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Define which routes require authentication
 *
 * createRouteMatcher creates a function that checks if a route matches any pattern.
 * Patterns support:
 * - Exact paths: '/add-job'
 * - Wildcards: '/jobs(.*)' matches /jobs, /jobs/123, /jobs/123/edit, etc.
 * - Multiple routes: Array of patterns
 *
 * Protected Routes:
 * - /add-job: Create a new job page
 * - /jobs(.*): All job-related pages (list, detail, edit)
 * - /stats: Statistics dashboard
 *
 * Note: Landing page (/) is NOT protected - users can view it without login
 */

const isProtectedRoute = createRouteMatcher([
  "/add-job",
  "/jobs(.*)",
  "/stats",
  "/user-profile(.*)",
]);

/**
 * Clerk Middleware Configuration
 *
 * clerkMiddleware wraps Clerk's authentication logic.
 * The callback function receives:
 * - auth: Clerk auth helper functions
 * - req: Next.js request object
 *
 * Flow:
 * 1. Check if requested route is protected
 * 2. If protected, call auth().protect()
 * 3. protect() checks authentication and redirects if needed
 */

export default clerkMiddleware(async (auth, req) => {
  // Only protect routes that are in the protected list
  // This allows public routes (like landing page) to be accessible
  if (isProtectedRoute(req)) {
    // protect() will:
    // - Check if user is authenticated
    // - If not, redirect to Clerk sign-in page
    // - If yes, allow request to proceed
   await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
