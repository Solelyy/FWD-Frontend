import { API_BASE_URL } from "@/lib/util/api";
import { AttendanceStatusFilter, EmployeesAttendanceResponse } from "../types/attendance-types";

export type EmployeeAttendanceProps= {
    page: number ;
    limit: number;
    year: number;
    month: number;
    day: number;
    filter: AttendanceStatusFilter
}

export async function employeeAttendanceApi({page, limit, year, day, month, filter}: EmployeeAttendanceProps): Promise<EmployeesAttendanceResponse> {
    const endpoint =  `/admin/employee-attendance?year=${year}&month=${month+1}&day=${day}&page=${page}&limit=${limit}&filter=${filter}`;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
        });
    
    if (!response.ok) throw new Error ("Cannot fetch attendance logs.");
    
    const result = await response.json();
    console.log("Fetch attendance: ", result);
    
    return result;   
};