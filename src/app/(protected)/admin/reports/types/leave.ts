import { AccountInfo } from "@/features/account-management/types/account";

export interface EmployeeLeaveReport {
    employeeId: AccountInfo["employeeId"];
    firstname: AccountInfo["firstname"];
    lastname: AccountInfo["lastname"];
    leaveUsed: number;
    sickLeaveBalance: number;
    vacationLeaveBalance: number;
    accumulatedLeave: number;
}

export type EmployeesLeaveReports = {
    records: EmployeeLeaveReport[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
