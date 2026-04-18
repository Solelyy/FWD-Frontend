import { LeaveRequestStatus } from "./leave"

export const leaveRequestStatusStyle: Record<LeaveRequestStatus, string> = {
    [LeaveRequestStatus.APPROVED]: "bg-green-100 text-green-600",
    [LeaveRequestStatus.PENDING]: "bg-yellow-100 text-yellow-600",
    [LeaveRequestStatus.REJECTED]: "bg-red-100 text-red-600"
}

export const formatLeaveRequestText: Record<LeaveRequestStatus, string> = {
    [LeaveRequestStatus.APPROVED]: "Leave Approved",
    [LeaveRequestStatus.PENDING]: "Leave Pending",
    [LeaveRequestStatus.REJECTED]: "Leave Rejected"
}