import { useQuery } from "@tanstack/react-query";
import { getDashboardRequests } from "../api/getDashboardRequests";

export function useDashboardRequests(month:number, year:number){
    return useQuery({
        queryKey: ["dashboard-requests"],
        queryFn: () => getDashboardRequests({month, year}),
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: true,
        staleTime: 2 * 60 * 60 * 1000, // 2hrs
    })
}