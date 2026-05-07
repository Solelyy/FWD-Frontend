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
    const endpoint="/employee/create-leave";
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({leaveType, startDate, endDate, reason, attachment})
    });

    const result = await response.json();
    if (!response.ok) {
        const message = result?.message || "";

        if (response.status === 400) {
            if (message.toLowerCase().includes("insufficient")) {
                throw new Error("Insufficient leave balance.");
            }

            if (message.toLowerCase().includes("same") || message.toLowerCase().includes("date")) {
            throw new Error("You already have a leave request on this date.");
        }

            if (message.toLowerCase().includes("pending")) {
                throw new Error("You already have a pending leave request. Please wait for it to be processed.");
            }

            throw new Error(message || "Invalid request, please try different one.");
        }

        throw new Error (result?.message || "Unable to submit leave request.");
    }

    console.log("Leave request response: ", result);

    return result;
}