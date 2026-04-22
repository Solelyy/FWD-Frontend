import { ReimbursementRequest } from "@/app/(protected)/employee/reimbursement/types/reimbursement";
import { AccountInfo } from "@/features/account-management/types/account";

export interface EmployeeReimbursementRequest extends ReimbursementRequest {
    firstname: AccountInfo["firstname"],
    lastname: AccountInfo["lastname"]
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