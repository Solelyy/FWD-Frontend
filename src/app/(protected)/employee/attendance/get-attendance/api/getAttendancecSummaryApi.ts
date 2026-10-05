import { AttendanceSummaryResponse } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";
import { API_BASE_URL } from "@/lib/util/api"
import { mockAttendanceSummary } from "../mock-data/attendance";

export async function getAttendanceSummaryApi(month:number, year:number) : Promise<AttendanceSummaryResponse>{
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        return mockAttendanceSummary;
    }

    const endpoint = `/employee/attendance-summary?year=${year}&month=${month+1}`
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