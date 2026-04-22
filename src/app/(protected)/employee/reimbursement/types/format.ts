import { ReimbursementRequestStatus } from "./reimbursement"

export const reimbursementStatusStyle: Record<ReimbursementRequestStatus, string> = {
    [ReimbursementRequestStatus.APPROVED]: "bg-green-100 text-green-600",
    [ReimbursementRequestStatus.PENDING]: "bg-yellow-100 text-yellow-600",
    [ReimbursementRequestStatus.REJECTED]: "bg-red-100 text-red-600"
}

export const formatReimbursementStatusText: Record<ReimbursementRequestStatus, string> = {
    [ReimbursementRequestStatus.APPROVED]: "Reimbursement Approved",
    [ReimbursementRequestStatus.PENDING]: "Reimbursement Pending",
    [ReimbursementRequestStatus.REJECTED]: "Reimbursement Rejected"
}