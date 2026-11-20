import { OverrideAttendancePayload } from "./overrideAttendanceApi";

export async function markAbsentApi({reason, status, id}: OverrideAttendancePayload) {
    const endpoint = "/api/admin/employee/absent"
    const response = await fetch(`${endpoint}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({attendanceId:id, status, reason})
    });

    if (!response.ok) {
        throw new Error ("Unable to mark attendance as absent.");
    }
    return response.json();
}