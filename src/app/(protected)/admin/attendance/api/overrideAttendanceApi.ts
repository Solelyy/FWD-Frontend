import { API_BASE_URL } from "@/lib/util/api";
import { EmployeeAttendance } from "../types/attendance-types";

export type OverrideAttendancePayload = {
    employeeId: EmployeeAttendance["id"];
    status: EmployeeAttendance["status"];
}
export async function overrideAttendanceApi({employeeId, status}: OverrideAttendancePayload) {
    const endpoint = "/"
    const response = await fetch(`${API_BASE_URL}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({status})
    });

    if (!response.ok) {
        throw new Error ("Unable to override attendance");
    }
    return response.json();
}