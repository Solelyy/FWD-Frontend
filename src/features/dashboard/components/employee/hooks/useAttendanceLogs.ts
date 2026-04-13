"use client"
import { useQuery } from "@tanstack/react-query";
import { getAttendanceLogsApi } from "../api/getAttendanceLogsApi";

const dummyLogs = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  date: new Date(2026, 3, i + 1).toISOString(),

  timeIn: {
    timestamp: new Date(2026, 3, i + 1, 8, 0).toISOString(),
  },

  timeOut: {
    timestamp: new Date(2026, 3, i + 1, 17, 30).toISOString(),
  },

  status: "COMPLETED",
  totalHours: 8,
}));

function getDummyPaginatedData(page: number, limit: number = 20) {
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    logs: dummyLogs.slice(start, end),
    meta: {
      page,
      limit,
      total: dummyLogs.length,
      hasNextPage: end < dummyLogs.length,
    },
  };
}


export function useAttendanceLogs(page: number, limit:number) {
    return useQuery({
        queryKey: ["attendance-logs", page, limit],
        queryFn: async () => {
            if (process.env.NODE_ENV === "development") {
            return getDummyPaginatedData(page);
            }
        return getAttendanceLogsApi(page, limit);
    },
        retry:1,
        refetchOnWindowFocus:false,
        staleTime: 2 * 60 * 60 * 1000 //two hours
    })
}
