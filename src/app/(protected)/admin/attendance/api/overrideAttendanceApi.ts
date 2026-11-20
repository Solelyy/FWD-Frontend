import { EmployeeAttendance } from "../types/attendance-types";

export type OverrideAttendancePayload = {
    id: EmployeeAttendance["attendanceId"]
    employeeId: EmployeeAttendance["employeeId"];
    status: EmployeeAttendance["status"];
    timeIn?: string;
    timeOut?: string;
    reason: string;
}
export async function overrideAttendanceApi({employeeId, timeIn, timeOut, reason}: OverrideAttendancePayload) {
    const endpoint = "/api/admin/employee/update-attendance";
    const response = await fetch(`${endpoint}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ employeeId, timeIn, timeOut, reason })
    });

    console.log(`Paylaod: 
        Timeine: ${timeIn}
        Timeout: ${timeOut}`);

    if (!response.ok) {
        throw new Error ("Unable to override attendance");
    }
    return response.json();
}