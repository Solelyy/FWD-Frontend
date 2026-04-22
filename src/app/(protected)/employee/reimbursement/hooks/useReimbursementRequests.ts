import { useQuery } from "@tanstack/react-query";
import { reimbursementRequestsApi } from "../api/reimbursementRequestsApi";

export function useReimbursementRequests() {
    return useQuery({
        queryKey: ["reimbursement-requests"],
        queryFn: reimbursementRequestsApi,
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false
    })
}