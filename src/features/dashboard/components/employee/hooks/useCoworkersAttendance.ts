import { useQuery } from "@tanstack/react-query";
import { getCoworkersAttendance } from "../api/getCoworkersAttendance";

export function useCoworkersAttendance(day: number, month:number, year:number){
    return useQuery({
        queryKey: ["coworkers-attendance"],
        queryFn: () => getCoworkersAttendance({day, month, year}),
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: true,
        staleTime: 2 * 60 * 60 * 1000, // 2hrs
    })
}