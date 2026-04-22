import { API_BASE_URL } from "@/lib/util/api";
import { OverrideAttendancePayload } from "./overrideAttendanceApi";

export async function addAttendanceApi({employeeId, status, timeIn, timeOut}: OverrideAttendancePayload) {
    const endpoint = `/admin/employee/add-attendance`;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ employeeId, timeIn, timeOut })
    });

    if (!response.ok) {
        throw new Error ("Unable to add attendance");
    }
    return response.json();
}