import { API_BASE_URL } from "@/lib/util/api";
import { LeaveType } from "../types/leave";

export type SubmitLeaveRequestPayload = {
    leaveType: LeaveType
    startDate: string;
    endDate: string
    reason: string;
    attachment?: File | null
}

export async function submitLeaveRequestApi({leaveType, startDate, endDate, reason, attachment}: SubmitLeaveRequestPayload){
    const endpoint="/employee/create-leave";
    const formData = new FormData();

    formData.append("leaveType", leaveType);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("reason", reason);
    if (attachment) {
        formData.append("attachment", attachment);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
        console.log("Result: ", result)
        const message = Array.isArray(result?.message)
        ? result.message.join(" ")
        : typeof result?.message === "string"
            ? result.message
            : JSON.stringify(result?.message || "");
        
        const lowerMessage = message.toLowerCase();

        if (response.status === 400) {
            if (lowerMessage.includes("greater")) {
                throw new Error("Please select a different end date for your request. Example: May 9 - May 10.");
            }

            if (lowerMessage.includes("insufficient")) {
                throw new Error("Insufficient leave balance.");
            }

            if (lowerMessage.includes("already have a leave request")) {
                throw new Error("You already have a leave request on this date.");
            }

            if (lowerMessage.includes("pending")) {
                throw new Error(
                    "You already have a pending leave request. Please wait for it to be processed."
                );
            }

            throw new Error(message || "Invalid request, please try again.");
        }

        throw new Error(message || "Unable to submit leave request.");
    }

    console.log("Leave request response: ", result);

    return result;
}