import { EditJobForm } from "@/components/EditJobForm";
import { getSingleJobAction } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

const JobDetailsPage = async ({ params }: JobDetailsPageProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  // Prefetch job details for the given ID
  await queryClient.prefetchQuery({
    queryKey: ["job", id],
    queryFn: () => getSingleJobAction(id),
  });

  return (
    // HydrationBoundary wraps the client components and provides them with the prefetched data from the server
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={id} />
    </HydrationBoundary>
  );
};

export default JobDetailsPage;
