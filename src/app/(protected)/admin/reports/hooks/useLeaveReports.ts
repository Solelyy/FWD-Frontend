import { useQuery } from "@tanstack/react-query";
import { getLeaveApi, LeavePayload } from "../api/getLeaveApi";

export function useLeaveReports({ month, year, page, limit }: LeavePayload) {
    return useQuery({
        queryKey: ["employees-leave-report", { month, year, page, limit }],
        queryFn: () => getLeaveApi({ month, year, page, limit }),
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false,
    });
}
