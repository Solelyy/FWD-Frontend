import { EmployeeLeaveRequest } from "../types/leave"
import { LeaveActionType } from "../types/leave-actions"
import { API_BASE_URL } from "@/lib/util/api";

export type UpdateLeaveStatusPayload = {
    employeeId: EmployeeLeaveRequest["employeeId"],
    leaveAction: LeaveActionType
}
export async function updateLeaveStatusApi({employeeId, leaveAction}: UpdateLeaveStatusPayload) {
    const endpoint = leaveAction === LeaveActionType.APPROVE
    ? "/"
    : "/";

    const formattedText = leaveAction === LeaveActionType.APPROVE ? "approve" : "reject";

    const response = await fetch(`${API_BASE_URL}${endpoint}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ employeeId }),
    },
    );

    const result= await response.json();

    console.log("updateLeaveStatus: ", result);

    if (!response.ok) {
        throw new Error(`Unable to ${formattedText} the leave request.`);
    }

    return result;
}