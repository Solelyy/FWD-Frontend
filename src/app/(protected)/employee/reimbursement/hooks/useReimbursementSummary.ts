import { useQuery } from "@tanstack/react-query";
import { reimbursementSummaryApi } from "../api/reimbursementSummaryApi";

export function useReimbursementSummary() {
    return useQuery({
        queryKey: ["reimbursement-summary"],
        queryFn: reimbursementSummaryApi,
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false
    })
}