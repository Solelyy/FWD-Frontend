import { LeaveType } from "@/app/(protected)/employee/leave/types/leave";
import { ReimbursementType } from "@/app/(protected)/employee/reimbursement/types/reimbursement";
import { Calendar, Clock, ReceiptText, Wallet } from "lucide-react";

export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";
export type RequestType = "LEAVE" | "CASH_ADVANCE" | "REIMBURSEMENT" | "OVERTIME";

export type DashboardRequest = {
    id: number;
    type: RequestType;
    leaveType?: LeaveType; //SICK, VACATION, OTHER
    reimbursementType?: ReimbursementType //FOOD, TRANSPORTATION, OTHER
    submittedAt: string;
    startDate?: string;
    endDate?: string;
    status: RequestStatus;
    amount?: number;
};

//Response
export type DashboardRequestsResponse = {
    requests: DashboardRequest[];
}

//STYLES
export const statusStyles: Record<RequestStatus, string> = {
    PENDING: "border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300",
    APPROVED: "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300",
    REJECTED: "border border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300",
};

export const statusText: Record<RequestStatus, string> = {
    PENDING: "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected",
};

export const requestIcon: Record<RequestType, React.ComponentType<{ className?: string }>> = {
    LEAVE: Calendar,
    CASH_ADVANCE: Wallet,
    REIMBURSEMENT: ReceiptText,
    OVERTIME: Clock
};

export const titleFormat: Record<RequestType, string> = {
    LEAVE: "Leave",
    CASH_ADVANCE: "Cash Advance",
    REIMBURSEMENT: "Reimbursement",
    OVERTIME: "Overtime"
}
