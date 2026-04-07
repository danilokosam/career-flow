/**
 * JobsList Component
 *
 * This component displays a paginated list of job applications with search and filter capabilities.
 * It uses React Query for data fetching and caching, and integrates with Next.js routing
 * for URL-based search parameters.
 *
 * Key Features:
 * - URL-based search and filtering (search params in URL)
 * - Pagination support
 * - Loading states
 * - Empty state handling
 * - Download functionality integration
 */
"use client";

import { JobCard } from "@/components/JobCard";
import { useSearchParams } from "next/navigation";
import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { ButtonContainer } from "@/components/ButtonContainer";
import { DownloadDropdown } from "@/components/DownloadDropdown";
import { Skeleton } from "@/components/ui/skeleton";

export const JobsList = () => {
  // useSearchParams hook reads URL query parameters
  // This allows users to bookmark/share filtered/searched views
  // Example: /jobs?search=developer&jobStatus=pending&page=2
  const searchParams = useSearchParams();

  // Extract search parameters from URL with default values
  // get() returns null if param doesn't exist, so we use || "" for empty string default
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "";

  // Parse page number from URL, default to page 1 if not provided or invalid
  const pageNumber = Number(searchParams.get("pageNumber") || "1");

  /**
   * Tanstack Query hook for data fetching
   *
   * useQuery provides:
   * - Automatic caching (same queryKey = cached result)
   * - Background refetching
   * - Loading states
   * - Error handling
   *
   * queryKey: Unique identifier for this query
   * - Includes search, jobStatus, and pageNumber so each combination is cached separately
   * - When any of these change, Tanstack Query knows to fetch new data
   *
   * queryFn: The function that fetches the data
   * - Calls server action getAllJobsAction with current filters
   */
  const { data, isPending } = useQuery({
    queryKey: ["jobs", search, jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  });

  // Extract data with safe defaults using optional chaining and nullish coalescing
  // This prevents errors if data is undefined or null
  const jobs = data?.jobs || [];
  const count = data?.count || 0;
  const totalPages = data?.totalPages || 0;

  if (isPending) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (jobs.length < 1) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-muted-foreground">
          No jobs found matching your criteria.
        </h2>
      </div>
    );
  }

  return (
    <>
      {/* Responsive header: Column layout on mobile, row layout on tablet/PC */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold capitalize tracking-tight">
            {count} jobs found
          </h2>
          <DownloadDropdown />
        </div>

        {totalPages > 1 && (
          <div className="w-full sm:w-auto overflow-x-auto">
            <ButtonContainer currentPage={pageNumber} totalPages={totalPages} />
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
};
