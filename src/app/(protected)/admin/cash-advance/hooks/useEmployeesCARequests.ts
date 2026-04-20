import { useQuery } from "@tanstack/react-query";
import { employeesCARequestsApi } from "../api/employeesCARequestsApi";
import { LeaveRequestsProps } from "../../leave/api/employeesLeaveRequests";

export function useEmployeesCARequests({page, filter, month, year,limit}: LeaveRequestsProps) {
    return useQuery({
        queryKey: ["employees-ca-requests", {page,filter, month, year, limit}],
        queryFn: () => employeesCARequestsApi({page, filter, month, year, limit}),
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false 
    });
}