import { useQuery } from "@tanstack/react-query";
import { employeesCashAdvanceApi } from "../api/employeesCashAdvanceApi";

export function useEmployeesCARequests() {
    return useQuery({
        queryKey: ["employees-ca-requests"],
        queryFn: employeesCashAdvanceApi,
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false 
    })
}