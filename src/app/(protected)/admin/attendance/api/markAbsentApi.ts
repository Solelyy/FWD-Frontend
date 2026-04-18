import { API_BASE_URL } from "@/lib/util/api";
import { OverrideAttendancePayload } from "./overrideAttendanceApi";

export async function markAbsentApi({employeeId, status}: OverrideAttendancePayload) {
    const endpoint = "/"
    const response = await fetch(`${API_BASE_URL}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({employeeId})
    });

    if (!response.ok) {
        throw new Error ("Unable to mark attendance as absent.");
    }
    return response.json();
}