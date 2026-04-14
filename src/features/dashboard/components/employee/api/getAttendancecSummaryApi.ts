import { AttendanceSummaryResponse } from "@/features/attendance/types/attendanceType";
import { API_BASE_URL } from "@/lib/util/api"

export async function getAttendanceSummaryApi(month:number, year:number) : Promise<AttendanceSummaryResponse>{
    const endpoint = `/attendance-summary?year=${year}&month=${month+1}`
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error ("Cannot fetch summary report for this month.")
    }
    const result = await response.json();
    console.log("Fetch summary: ", result);
    
    return result;
}