import { CashAdvanceRequestStatus } from "@/app/(protected)/employee/cash-advance/types/cash-advance";
import { AccountInfo } from "@/features/account-management/types/account";

export type EmployeeCARequest = {
    id: number;
    employeeId: AccountInfo["employeeId"];
    dateSubmitted: string;
    requestedAmount: string;
    approvedAmount: string;
    status: CashAdvanceRequestStatus
}

export type EmployeesCARequests = {
    requests: EmployeeCARequest[];
}

export type EmployeesCARequestsSummary = {
    totalRequests: number;
    totalCashAdvanced: number;
    totalPendingRequests: number;
}