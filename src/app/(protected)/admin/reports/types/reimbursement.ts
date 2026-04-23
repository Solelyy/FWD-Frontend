import { AccountInfo } from "@/features/account-management/types/account";

export interface EmployeeReimbursementReport {
    employeeId: AccountInfo["employeeId"];
    firstname: AccountInfo["firstname"];
    lastname: AccountInfo["lastname"];
    totalAmountReimbursed: number;
}

export type EmployeesReimbursementReports = {
    records: EmployeeReimbursementReport[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
