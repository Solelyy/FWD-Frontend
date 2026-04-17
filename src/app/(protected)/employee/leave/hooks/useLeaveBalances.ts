import { useQuery } from "@tanstack/react-query";
import { leaveBalancesApi } from "../api/leaveBalancesApi";

export function useLeaveBalances() {
    return useQuery({
        queryKey: ["leave-balances"],
        queryFn: leaveBalancesApi,
        retry: 1,
        refetchOnWindowFocus: false,
        placeholderData: (prev) => prev,
        staleTime: 2 * 60 * 60 * 1000, // 2hrs
    });
}