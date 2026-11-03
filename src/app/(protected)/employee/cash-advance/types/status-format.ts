import { CashAdvanceRequestStatus } from "./cash-advance"

export const cashAdvanceStatusStyle: Record<CashAdvanceRequestStatus, string> = {
    [CashAdvanceRequestStatus.APPROVED]: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300",
    [CashAdvanceRequestStatus.PENDING]: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300",
    [CashAdvanceRequestStatus.REJECTED]: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
}

export const formatCashAdvanceStatusText: Record<CashAdvanceRequestStatus, string> = {
    [CashAdvanceRequestStatus.APPROVED]: "APPROVED",
    [CashAdvanceRequestStatus.PENDING]: "PENDING",
    [CashAdvanceRequestStatus.REJECTED]: "REJECTED"
}