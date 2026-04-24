import { useQuery } from "@tanstack/react-query";
import { employeesLeaveRequestsApi, LeaveRequestsProps } from "../api/employeesLeaveRequests";

export function useEmployeesLeaveRequests({page, filter, month, year,limit}: LeaveRequestsProps) {
    return useQuery({
        queryKey: ["employees-leave-requests", {page, filter, month, year, limit}],
        queryFn: () => employeesLeaveRequestsApi({page, limit, year, month, filter}),
        refetchOnWindowFocus:false, 
        staleTime: 2 * 60 * 60 * 1000,//two hours
        placeholderData: (prev) => prev,
    });
}