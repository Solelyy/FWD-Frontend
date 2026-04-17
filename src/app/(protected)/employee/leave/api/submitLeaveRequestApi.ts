import { API_BASE_URL } from "@/lib/util/api";
import { LeaveType } from "../types/leave";

export type SubmitLeaveRequestPayload = {
    leaveType: LeaveType
    startDate: string;
    endDate: string
    reason: string;
    attachment?: string;
}

export async function submitLeaveRequestApi({leaveType, startDate, endDate, reason, attachment}: SubmitLeaveRequestPayload){
    const endpoint="/";
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({leaveType, startDate, endDate, reason, attachment})
    });

    const result = await response.json();
    console.log("Leave request response: ", result);

    if (!response.ok) {
        throw new Error ("Unable to submit leave request.");
    }
    return result;
}