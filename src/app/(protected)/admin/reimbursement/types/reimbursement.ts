import { AccountInfo } from "@/features/account-management/types/account";
import { ReimbursementType, ReimbursementRequestStatus } from "@/app/(protected)/employee/reimbursement/types/reimbursement";

export type EmployeeReimbursementRequest = {
    id: number,
    employeeId: AccountInfo["employeeId"],
    dateSubmitted: string;
    type: ReimbursementType;
    requestedAmount: number;
    approvedAmount: number;
    reason?: string;
    attachment?: string;
    status: ReimbursementRequestStatus;
    firstname: AccountInfo["firstname"];
    lastname: AccountInfo["lastname"];
}

export type EmployeeReimbursementRequests = {
    requests: EmployeeReimbursementRequest[];
    meta: {
        page: number;
        limit: number; 
        total: number;
    }
}

export type EmployeeReimbursementSummary = {
    totalRequests: number;
    totalPending: number;
    totalReimbursed: number
}