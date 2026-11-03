import { LeaveRequestStatus } from "./leave"

export const leaveRequestStatusStyle: Record<LeaveRequestStatus, string> = {
    [LeaveRequestStatus.APPROVED]: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300",
    [LeaveRequestStatus.PENDING]: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300",
    [LeaveRequestStatus.REJECTED]: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
}

export const formatLeaveRequestText: Record<LeaveRequestStatus, string> = {
    [LeaveRequestStatus.APPROVED]: "APPROVED",
    [LeaveRequestStatus.PENDING]: "PENDING",
    [LeaveRequestStatus.REJECTED]: "REJECTED"
}