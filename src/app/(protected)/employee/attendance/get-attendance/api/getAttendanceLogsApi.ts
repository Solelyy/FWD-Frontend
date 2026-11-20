import { AttendanceLogsResponse, } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";
import { mockAttendanceLogs } from "../mock-data/attendance";

export async function getAttendanceLogsApi(page: number, limit: number, year:number, month: number): Promise<AttendanceLogsResponse> {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        return {
            ...mockAttendanceLogs,
            logs: mockAttendanceLogs.logs.slice((page - 1) * limit, page * limit),
            meta: { ...mockAttendanceLogs.meta, page, limit },
        };
    }

    const endpoint =  `/api/employee/attendance-logs?page=${page}&limit=${limit}&year=${year}&month=${month+1}`;
    const response = await fetch(`${endpoint}`, {
        method: "GET",
        credentials: "include"
        });
    
    if (!response.ok) throw new Error ("Cannot fetch attendance logs.");
    
    const result = await response.json();
    console.log("Fetch attendance: ", result);
    
    return result;   
};