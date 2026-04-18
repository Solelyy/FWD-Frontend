import { API_BASE_URL } from "@/lib/util/api";
import { EmployeeAttendance } from "../types/attendance-types";

export type OverrideAttendancePayload = {
    employeeId: EmployeeAttendance["employeeId"];
    status: EmployeeAttendance["status"];
    timeIn?: string;
    timeOut?: string;
}
export async function overrideAttendanceApi({employeeId, status, timeIn, timeOut}: OverrideAttendancePayload) {
    const endpoint = `/${employeeId}`;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ employeeId, timeIn, timeOut })
    });

    if (!response.ok) {
        throw new Error ("Unable to override attendance");
    }
    return response.json();
}