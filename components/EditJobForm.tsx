"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from "@/utils/types";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { CustomFormField, CustomFormSelect } from "@/components/FormComponents";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getSingleJobAction, updateJobAction } from "@/utils/actions";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const EditJobForm = ({ jobId }: { jobId: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch existing job data to populate the form for editing
  const { data, isError } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  // Set up form with Zod validation and default values
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  // Populate form with existing job data when data is received
  useEffect(() => {
    if (data) {
      form.reset({
        position: data.position,
        company: data.company,
        location: data.location,
        status: data.status as JobStatus,
        mode: data.mode as JobMode,
      });
    }
  }, [data, form]);

  // Mutation for updating the job
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: (updatedJob) => {
      toast.success(`Job "${updatedJob.position}" updated`);

      // Invalidate queries to ensure all views see the change
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });

      router.push("/jobs");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(`Error updating job: ${error.message}`);
      }
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    mutate(values);
  }

  // If there is an error loading the job (e.g. ID does not exist)
  if (isError) {
    return (
      <h2 className="text-destructive">There was an error loading the job.</h2>
    );
  }

  // If the job data is still loading
  if (!data) {
    return <h2 className="text-muted-foreground">Loading job data...</h2>;
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">edit job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          <CustomFormField name="position" control={form.control} />
          <CustomFormField name="company" control={form.control} />
          <CustomFormField name="location" control={form.control} />

          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />
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
            {isPending ? "updating..." : "edit job"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
