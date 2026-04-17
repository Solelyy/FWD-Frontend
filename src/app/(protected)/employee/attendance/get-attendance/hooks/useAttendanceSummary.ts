import { useQuery } from "@tanstack/react-query";
import { getAttendanceSummaryApi } from "../api/getAttendancecSummaryApi";

export function useAttendanceSummary(month: number, year: number) {
  return useQuery({
    queryKey: ["attendance-summary", year, month],
    queryFn: () => getAttendanceSummaryApi(month, year),
    enabled: !!month && !!year,
    placeholderData: (prev) => prev,
    retry: 1, //retry api call once fails, so 2 try (initial + retry)
    refetchOnWindowFocus:false, //when user switch tab
    staleTime: 2 * 60 * 60 * 1000 //two hours
  });
}