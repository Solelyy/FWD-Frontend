import { OverrideAttendancePayload } from "./overrideAttendanceApi";

export async function addAttendanceApi({employeeId, reason, timeIn, timeOut}: OverrideAttendancePayload) {
    const endpoint = `/api/admin/employee/add-attendance`;
    const response = await fetch(`${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ employeeId, timeIn, timeOut, reason })
    });

    if (!response.ok) {
        throw new Error ("Unable to add attendance");
    }
    return response.json();
}