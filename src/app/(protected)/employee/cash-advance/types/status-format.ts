import { CashAdvanceRequestStatus } from "./cash-advance"

export const cashAdvanceStatusStyle: Record<CashAdvanceRequestStatus, string> = {
    [CashAdvanceRequestStatus.APPROVED]: "bg-green-100 text-green-600",
    [CashAdvanceRequestStatus.PENDING]: "bg-yellow-100 text-yellow-600",
    [CashAdvanceRequestStatus.REJECTED]: "bg-red-100 text-red-600"
}

export const formatCashAdvanceStatusText: Record<CashAdvanceRequestStatus, string> = {
    [CashAdvanceRequestStatus.APPROVED]: "Cash Advance Approved",
    [CashAdvanceRequestStatus.PENDING]: "Cash Advance Pending",
    [CashAdvanceRequestStatus.REJECTED]: "Cash Advance Rejected"
}