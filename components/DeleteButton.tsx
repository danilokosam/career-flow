import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobAction } from "@/utils/actions";

export const DeleteButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),

    onSuccess: (data) => {
      toast.success(
        `${data.position} at ${data.company} deleted successfully!`,
      );

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
    },

    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return (
    <Button
      size="sm"
      variant="destructive"
      disabled={isPending}
      onClick={() => {
        if (confirm("Are you sure you want to delete this job?")) {
          mutate(id);
        }
      }}
    >
      {isPending ? "deleting..." : "delete"}
    </Button>
  );
};
