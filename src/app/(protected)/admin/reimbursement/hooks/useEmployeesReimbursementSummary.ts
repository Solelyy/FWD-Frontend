import { useQuery } from "@tanstack/react-query";
import { employeesReimbursementSummaryApi } from "../api/employeesReimbursementSummaryApi";

export function useEmployeesReimbursementSummary(month:number, year:number) {
    return useQuery({
        queryKey: ["employees-reimbursement-summary",  {month, year}],
        queryFn: () => employeesReimbursementSummaryApi({month, year}),
        retry: 1,
        refetchOnWindowFocus:false, //when user switch tab
        staleTime: 30 * 60 * 1000, //30 mins
        placeholderData: (prev) => prev,
    })
}