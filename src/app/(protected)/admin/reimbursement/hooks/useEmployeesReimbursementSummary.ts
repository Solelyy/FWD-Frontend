import { useQuery } from "@tanstack/react-query";
import { employeesReimbursementSummaryApi } from "../api/employeesReimbursementSummaryApi";

export function useEmployeesReimbursementSummary(month:number, year:number) {
    return useQuery({
        queryKey: ["employees-reimbursement-summary",  {month, year}],
        queryFn: () => employeesReimbursementSummaryApi({month, year}),
        retry: 1,
        refetchOnWindowFocus:true, //when user switch tab
        staleTime: 2* 60 * 60 * 1000, //2 hrs
        placeholderData: (prev) => prev,
    })
}