/**
 * All Jobs Page Component
 *
 * This is a Next.js Server Component that pre-fetches job data on the server
 * before sending the page to the client. This improves initial page load performance.
 *
 * Key Features:
 * - Server-side data prefetching using Tanstack Query
 * - Hydration: Server data is "hydrated" into client-side Tanstack Query cache
 * - This prevents loading spinners on initial page load
 *
 * Tanstack Query Hydration Pattern:
 * 1. Prefetch data on server
 * 2. Dehydrate (serialize) the query cache
 * 3. Send dehydrated state to client
 * 4. Hydrate client-side Tanstack Query with server data
 */
import { JobsList } from "@/components/JobList";
import { SearchForm } from "@/components/SearchForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllJobsAction } from "@/utils/actions";

interface AllJobsPageProps {
  searchParams: Promise<{
    search?: string;
    jobStatus?: string;
    page?: string;
  }>;
}

const AllJobsPage = async ({ searchParams }: AllJobsPageProps) => {
  const { search, jobStatus, page } = await searchParams;

  const searchTerm = search || "";
  const status = jobStatus || "all";
  const pageNumber = Number(page) || 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    // It has the same query key structure as the one used in the JobsList component.
    queryKey: ["jobs", searchTerm, status, pageNumber],
    queryFn: () =>
      getAllJobsAction({
        search: searchTerm,
        jobStatus: status,
        page: pageNumber,
      }),
  });

  /**
   * HydrationBoundary wraps the client components and provides them with
   * the prefetched data from the server.
   *
   * dehydrate() serializes the query cache so it can be sent to the client
   * The client-side React Query will hydrate this data, making it immediately
   * available without a loading state.
   */
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      <JobsList />
    </HydrationBoundary>
  );
};

export default AllJobsPage;
