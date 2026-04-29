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
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
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
