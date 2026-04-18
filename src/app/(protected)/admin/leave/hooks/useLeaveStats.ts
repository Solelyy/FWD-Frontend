import { useQuery } from "@tanstack/react-query";
import { employeesLeaveStatsApi } from "../api/employeesLeaveStatsApi";

export function useLeaveStats(month:number, year:number) {
    return useQuery({
        queryKey: ["leave-requests-stats",  {month, year}],
        queryFn: () => employeesLeaveStatsApi({month, year}),
        retry: 1,
        refetchOnWindowFocus:false, //when user switch tab
        staleTime: 30 * 60 * 1000, //30 mins
        placeholderData: (prev) => prev,
    })
}