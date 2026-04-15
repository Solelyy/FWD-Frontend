import { API_BASE_URL } from "@/lib/util/api";
import { OverrideAttendancePayload } from "./overrideAttendanceApi";

export async function addAttendanceApi({employeeId, status}: OverrideAttendancePayload) {
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
        throw new Error ("Unable to add attendance");
    }
    return response.json();
}