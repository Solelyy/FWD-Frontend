import { AccountInfo } from "@/features/account-management/types/account";

export type EmployeeLeaveBalances = {
    id: number;
    employeeId: AccountInfo["employeeId"],
    sickLeaveBalance: number;
    vacationLeaveBalance: number;
    accumulatedLeave: number;
    firstname: AccountInfo["firstname"];
    lastname: AccountInfo["lastname"];
}

export type EmployeesLeaveBalancesResponse = {
    employees: EmployeeLeaveBalances[];
}