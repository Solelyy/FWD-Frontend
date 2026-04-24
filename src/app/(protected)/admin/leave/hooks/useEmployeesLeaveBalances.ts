import { useQuery } from "@tanstack/react-query";
import { employeesLeaveBalancesApi } from "../api/employeesLeaveBalancesApi";

export function useEmployeesLeaveBalances() {
    return useQuery({
        queryKey: ["employees-leave-balances"],
        queryFn: employeesLeaveBalancesApi,
        refetchOnWindowFocus:true, 
        staleTime: 2 * 60 * 60 * 1000, //two hours
        placeholderData: (prev) => prev,
    });
}