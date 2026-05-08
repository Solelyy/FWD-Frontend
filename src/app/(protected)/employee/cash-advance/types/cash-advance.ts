export type CashAdvanceSummary = {
    totalAdvanced: number;
}

export type CashAdvanceRequest = {
    id: number
    dateSubmitted: string;
    amountRequested: number;
    amountApproved: number;
    status: CashAdvanceRequestStatus;
    reason?: string;
    actionMade?: {
        adminFirstname?: string;
        adminLastname?: string;
        rejectionReason?: string;
        timestamp?: string;
    }
}

export enum CashAdvanceRequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export type CashAdvanceRequests = {
    records: CashAdvanceRequest[];
}