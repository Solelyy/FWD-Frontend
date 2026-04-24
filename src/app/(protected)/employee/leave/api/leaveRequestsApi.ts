import { API_BASE_URL } from "@/lib/util/api";
import { LeaveRequestsResponse } from "../types/leave";

export async function leaveRequestsApi(): Promise<LeaveRequestsResponse> {
    const endpoint= "/employee/leave-requests";
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error ("Unable to fetch leave requests.");
    }

    const result = await response.json();
    return result;
}