"use client"
import { useQuery } from "@tanstack/react-query";
import { getAttendanceLogsApi } from "../api/getAttendanceLogsApi";


export function useAttendanceLogs(page: number, limit: number, year: number, month: number) {
  return useQuery({
    queryKey: ["attendance-logs", page, limit, year, month],
    queryFn: () => getAttendanceLogsApi(page, limit, year, month),
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 60 * 1000,
  })
}