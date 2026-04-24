import { EmployeeAttendances } from "../types/attendance";
import { mockEmployeeAttendances } from "../mock-data/attendance";

export type AttendancePayload= {
    month: number;
    year: number;
    cutoff: string;
}
export async function getAttendanceApi({month, year, cutoff}: AttendancePayload): Promise<EmployeeAttendances>{
    return mockEmployeeAttendances;
}

/*
export async function getAttendanceApi({month, year, cutoff}: AttendancePayload): Promise<EmployeeAttendances>{
    const endpoint = ``;

    const response = await fetch(`${API_BASE_URL}`, {
        method: "GET",
        credentials: "include"
    });

    const result = await response.json();
    console.log("Attendance result: ", result);

    if (!response.ok) {
        throw new Error ("Unable to fetch employees attendance report.")
    }
    
    return result;
}
*/