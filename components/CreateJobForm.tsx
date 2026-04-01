/**
 * CreateJobForm Component
 *
 * This component provides a form for creating new job applications.
 * It uses React Hook Form for form management and Zod for validation.
 *
 * Key Features:
 * - Form validation with Zod schema
 * - Optimistic UI updates with React Query
 * - Toast notifications for user feedback
 * - Automatic navigation after successful creation
 * - Query cache invalidation to refresh data
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from "@/utils/types";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomFormField, CustomFormSelect } from "@/components/FormComponents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJobAction } from "@/utils/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const CreateJobForm = () => {
  /**
   * React Hook Form Setup
   *
   * useForm hook manages form state, validation, and submission.
   *
   * zodResolver: Integrates Zod schema with React Hook Form
   * - Automatically validates form data against createAndEditJobSchema
   * - Provides error messages from Zod schema
   * - Type-safe form handling
   *
   * defaultValues: Initial form values
   * - Empty strings for text inputs
   * - Default enums for select dropdowns
   */
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema), // Zod validation integration
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending, // Default to "pending" status
      mode: JobMode.FullTime, // Default to "full-time" mode
    },
  });

  /**
   * React Query Hooks
   *
   * queryClient: Used to invalidate/refetch queries after mutation
   * router: Next.js navigation (client-side routing)
   */
  const queryClient = useQueryClient();
  const router = useRouter();

  /**
   * React Query Mutation Hook
   *
   * useMutation handles async operations that modify data (create, update, delete).
   * Unlike useQuery (for fetching), mutations are triggered manually (on form submit).
   *
   * mutationFn: The async function that performs the mutation
   * - Calls createJobAction server action with form values
   *
   * onSuccess: Callback when mutation succeeds
   * - Checks if data was returned (null = error)
   * - Shows toast notification
   * - Invalidates related queries to refresh data
   * - Navigates to jobs list page
   *
   * isPending: Boolean indicating if mutation is in progress
   * - Used to disable submit button and show loading state
   */
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: () => {
      toast.success("Job created successfully");

      // Invalidate queries to refresh data after successful creation
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      form.reset();
      router.push("/jobs");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  /**
   * Form Submit Handler
   *
   * Called when user submits the form.
   * React Hook Form validates data before calling this function.
   * If validation passes, mutate() is called with form values.
   *
   * @param values - Validated form data (type-safe from Zod schema)
   */
  function onSubmit(values: CreateAndEditJobType) {
    if (isPending) return; // Prevent multiple submissions while mutation is in progress
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        className="bg-muted p-8 rounded"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* position */}
          <CustomFormField name="position" control={form.control} />
          {/* company */}
          <CustomFormField name="company" control={form.control} />
          {/* location */}
          <CustomFormField name="location" control={form.control} />
          {/* job status */}
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />
          {/* job  type */}
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />
          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}
          >
            {isPending ? "loading..." : "create job"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
