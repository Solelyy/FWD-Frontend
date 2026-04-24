import { useQuery } from "@tanstack/react-query";
import { leaveRequestsApi } from "../api/leaveRequestsApi";

export function useLeaveRequests() {
    return useQuery({
        queryKey: ["leave-requests"],
        queryFn: leaveRequestsApi,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 2 * 60 * 60 * 1000, // 2hrs
    });
}