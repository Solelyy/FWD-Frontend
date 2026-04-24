import { useQuery } from "@tanstack/react-query";
import { getEmployeesSummaryApi } from "../api/getEmployeesSummaryApi";

export function useEmployeesSummary() {
    return useQuery ({
        queryKey: ["employees-accounts-summary"],
        queryFn: getEmployeesSummaryApi,
        refetchOnWindowFocus: true, //when user switch tab
        staleTime: 2 * 60 * 60 * 1000, //2 hrs
        placeholderData: (prev) => prev,
    })
}