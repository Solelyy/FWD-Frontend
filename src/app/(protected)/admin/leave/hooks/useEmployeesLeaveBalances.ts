import { useQuery } from "@tanstack/react-query";
import { employeesLeaveBalancesApi } from "../api/employeesLeaveBalancesApi";

export function useEmployeesLeaveBalances() {
    return useQuery({
        queryKey: ["employees-leave-balances"],
        queryFn: employeesLeaveBalancesApi,
        refetchOnWindowFocus:false, 
        staleTime: 2 * 60 * 60 * 1000 //two hours
    });
}