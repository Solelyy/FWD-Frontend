import { useQuery } from "@tanstack/react-query";
import { AttendancePayload, getAttendanceApi } from "../api/getAttendanceApi";

export function useAttendanceReports({month, year, cutoff}: AttendancePayload) {
    return useQuery ({
        queryKey: ["employees-attendance-report", {month, year, cutoff}],
        queryFn: () => getAttendanceApi({month, year, cutoff}),
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false 
    })
}