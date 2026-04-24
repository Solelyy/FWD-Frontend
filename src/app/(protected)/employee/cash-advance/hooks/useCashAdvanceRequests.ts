import { useQuery } from "@tanstack/react-query";
import { cashAdvanceRequestsApi } from "../api/cashAdvanceRequestsApi";

export function useCashAdvanceRequests() {
    return useQuery({
        queryKey: ["cash-advance-requests"],
        queryFn: cashAdvanceRequestsApi,
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false
    });
}
