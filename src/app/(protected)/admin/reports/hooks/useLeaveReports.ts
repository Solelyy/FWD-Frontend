import { useQuery } from "@tanstack/react-query";
import { getLeaveApi, LeavePayload } from "../api/getLeaveApi";

export function useLeaveReports({ month, year }: LeavePayload) {
    return useQuery({
        queryKey: ["employees-leave-report", { month, year }],
        queryFn: () => getLeaveApi({ month, year }),
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false,
    });
}
