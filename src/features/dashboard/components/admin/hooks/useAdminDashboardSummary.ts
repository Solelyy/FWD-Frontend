import { useQuery } from "@tanstack/react-query";
import { adminDashboardSummaryApi, Props } from "../api/adminDashboardSummaryApi";

export function useAdminDashboardSummary({month, year, day}: Props) {
    return useQuery({
        queryKey: ["admin-dashboard-summary"],
        queryFn: () => adminDashboardSummaryApi({month, year, day}),
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: true,
        staleTime: 2 * 60 * 60 * 1000, // 2hrs
    });
}