import { CashAdvanceRequestStatus } from "@/app/(protected)/employee/cash-advance/types/cash-advance";
import { AccountInfo } from "@/features/account-management/types/account";

export type EmployeeCARequest = {
    id: number;
    employeeId: AccountInfo["employeeId"];
    firstname: AccountInfo["firstname"];
    lastname: AccountInfo["lastname"];
    dateSubmitted: string;
    requestedAmount: number;
    approvedAmount: number;
    status: CashAdvanceRequestStatus
    reason?: string;
    attachment?: string;
    actionMade?: {
        adminFirstname?: string;
        adminLastname?: string;
        rejectionReason?: string;
        timestamp?: string;
    }
}

export type EmployeesCARequestsResponse = {
    logs: EmployeeCARequest[];
    meta: {
        page: number;
        limit: number;
        total: number;
  }
}

export type EmployeesCARequestsSummary = {
    totalRequests: number;
    totalCashAdvance: number;
    totalPendingRequests: number;
}