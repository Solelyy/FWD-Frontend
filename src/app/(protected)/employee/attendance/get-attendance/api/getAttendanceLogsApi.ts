import { AttendanceLogsResponse, } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";
import { API_BASE_URL } from "@/lib/util/api";

export async function getAttendanceLogsApi(page: number, limit: number, year:number, month: number): Promise<AttendanceLogsResponse> {
    const endpoint =  `/employee/attendance-logs?page=${page}&limit=${limit}&year=${year}&month=${month+1}`;;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
        });
    
    if (!response.ok) throw new Error ("Cannot fetch attendance logs.");
    
    const result = await response.json();
    console.log("Fetch attendance: ", result);
    
    return result;   
};