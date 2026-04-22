import { API_BASE_URL } from "@/lib/util/api";
import { EmployeesAttendanceStatsResponse } from "../types/attendance-types";

type EmployeeAttendanceStatsApiPayload = {
    day: number,
    month: number,
    year: number
}

export async function employeesAttendanceStatsApi({day, month, year}: EmployeeAttendanceStatsApiPayload): Promise<EmployeesAttendanceStatsResponse>{
    const endpoint = `/admin/employee-attendance?year=${year}&month=${month}&day=${day}`;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error ("Cannot fetch summary report for this month.")
    }
    const result = await response.json();
    console.log("Fetch summary: ", result);

    return result();
}