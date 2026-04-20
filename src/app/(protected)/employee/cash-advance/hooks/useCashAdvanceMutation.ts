import { useQueryClient, useMutation } from "@tanstack/react-query"
import { submitCashAdvanceApi } from "../api/submitCashAdvanceApi";

export function useCashAdvanceMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: submitCashAdvanceApi,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cash-advance-requests"]})
        }
    });
}