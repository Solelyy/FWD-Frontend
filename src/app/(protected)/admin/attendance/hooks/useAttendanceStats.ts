import { useQuery } from "@tanstack/react-query";
import { employeesAttendanceStatsApi } from "../api/employeesAttendanceStatsApi";

export function useAttendanceStats(day: number, month:number, year:number) {
    return useQuery({
        queryKey: ["employees-attendance-stats",  {day, month, year}],
        queryFn: () => employeesAttendanceStatsApi({day, month, year}),
        retry: 1,
        refetchOnWindowFocus:false, //when user switch tab
        staleTime: 30 * 60 * 1000, //30 mins
        placeholderData: (prev) => prev,
    })
}