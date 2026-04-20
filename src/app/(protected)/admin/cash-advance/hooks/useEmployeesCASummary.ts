import { useQuery } from "@tanstack/react-query";
import { employeesCASummaryApi } from "../api/employeesCASummaryApi";

export function useEmployeesCASummary() {
    return useQuery({
        queryKey: ["employees-ca-summary"],
        queryFn: employeesCASummaryApi,
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false 
    })
}