import { useQuery } from "@tanstack/react-query";

import { getReportsSummaryApi } from "../api/getReportsSummaryApi";

export function useReportsSummary(month: number, year: number) {
    return useQuery({
        queryKey: ["reports-summary", year, month],
        queryFn: () => getReportsSummaryApi(month, year),
        enabled: !!month && !!year,
        placeholderData: (prev) => prev,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 2 * 60 * 60 * 1000,
    });
}
