import { useQuery } from "@tanstack/react-query";
import { cashAdvanceSummaryApi } from "../api/cashAdvanceSummaryApi";

export function useCashAdvanceSummary(){
    return useQuery({
        queryKey: ["cash-advance-summary"],
        queryFn: cashAdvanceSummaryApi,
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false
    })
}