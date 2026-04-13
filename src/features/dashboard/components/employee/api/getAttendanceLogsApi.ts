import { AttendanceStatus, AttendanceLogsResponse} from "@/features/attendance/types/attendanceType";
import { API_BASE_URL } from "@/lib/util/api";

export async function getAttendanceLogsApi(page: number, limit: number, year:number, month: number): Promise<AttendanceLogsResponse> {
    const endpoint =  `/attendance-logs?page=${page}&limit=${limit}&year=${year}&month=${month}`;;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
        });
    
        if (!response.ok) throw new Error ("Cannot fetch attendance logs.");
    
        const result = await response.json();
        console.log("Fetch attendance: ", result);
    
        return {
            logs: (result?.logs ?? []).map((log: any) => ({
                id: log.id ?? "",
                date: log.date ?? "",

                timeIn: {
                timestamp: log.timeIn?.timestamp ?? null,
                },

                timeOut: {
                timestamp: log.timeOut?.timestamp ?? null,
                },

                status: log.status ?? AttendanceStatus.NONE,
                totalHours: log.totalHours ?? null,
            })),

            meta: {
                page: result?.meta?.page ?? 1,
                limit: result?.meta?.limit ?? limit,
                total: result?.meta?.total ?? 0,
            },
        };
};