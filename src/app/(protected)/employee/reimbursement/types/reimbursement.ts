import { AccountInfo } from "@/features/account-management/types/account";

export type ReimbursementSummary = {
    totalApproved: number;
    totalPending: number;
}

export enum ReimbursementType {
    FOOD = "FOOD",
    TRANSPORTATION = "TRANSPORTATION",
    OTHER = "OTHER"
}

export enum ReimbursementRequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export type ReimbursementRequest = {
    id: number,
    employeeId: AccountInfo["employeeId"];
    dateSubmitted: string;
    type: ReimbursementType;
    amountRequested: number;
    amountApproved: number;
    reason?: string;
    attachment: string;
    status: ReimbursementRequestStatus
}

export type ReimbursementRequests = {
    requests: ReimbursementRequest[];
}