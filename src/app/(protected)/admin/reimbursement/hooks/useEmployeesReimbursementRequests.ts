import { useQuery } from "@tanstack/react-query";
import { employeesReimbursementRequestApi } from "../api/employeesReimbursementRequestsApi";
import { LeaveRequestsProps } from "../../leave/api/employeesLeaveRequests";

export function useEmployeesReimbursementRequests({page, filter, month, year,limit}: LeaveRequestsProps){
    return useQuery({
        queryKey: ["employees-reimbursement-requests", {page, filter, month, year, limit}],
        queryFn: () => employeesReimbursementRequestApi({page, filter, month, year, limit}),
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false 
    })
}