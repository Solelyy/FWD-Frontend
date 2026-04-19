export type CashAdvanceSummary = {
    totalAdvanced: number;
}

export type CashAdvanceRequest = {
    id: number
    dateSubmitted: string;
    amountRequested: number;
    amountApproved: number;
    status: CashAdvanceRequestStatus
}

export enum CashAdvanceRequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export type CashAdvanceRequests = {
    request: CashAdvanceRequest[];
}