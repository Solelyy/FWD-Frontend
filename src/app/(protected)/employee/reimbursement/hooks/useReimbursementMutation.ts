import { useQueryClient, useMutation } from "@tanstack/react-query"
import { submitReimbursementApi } from "../api/submitReimbursementApi";

export function useReimbursementMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: submitReimbursementApi,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["reimbursement-requests"]})
            queryClient.invalidateQueries({queryKey: ["reimbursement-summary"]})
        }
    });
}