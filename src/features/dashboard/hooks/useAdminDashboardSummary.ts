import { useQuery } from "@tanstack/react-query"
import { adminDashboardSummaryApi, Props } from "../api/adminDashboardSummaryApi"

export function useAdminDashboardSummary({month, year, day} : Props) {
    return useQuery({
        queryKey: ["admin-dashboard-summary", {month, year, day}],
        queryFn: () => adminDashboardSummaryApi({month, year, day}),
        refetchOnWindowFocus: true, //when user switch tab
        staleTime: 30 * 60 * 1000, //30 mins
        placeholderData: (prev) => prev,
    })
}