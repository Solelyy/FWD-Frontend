import { useQuery } from "@tanstack/react-query";
import { employeesCARequestsApi } from "../api/employeesCARequestsApi";

export function useEmployeesCARequests() {
    return useQuery({
        queryKey: ["employees-ca-requests"],
        queryFn: employeesCARequestsApi,
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false 
    });
}