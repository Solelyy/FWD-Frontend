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
}

export type EmployeesCARequestsResponse = {
    requests: EmployeeCARequest[];
}

export type EmployeesCARequestsSummary = {
    totalRequests: number;
    totalCashAdvanced: number;
    totalPendingRequests: number;
}