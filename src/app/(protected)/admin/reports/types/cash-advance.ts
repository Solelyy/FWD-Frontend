import { AccountInfo } from "@/features/account-management/types/account";

export interface EmployeeCashAdvanceReport {
    employeeId: AccountInfo["employeeId"];
    firstname: AccountInfo["firstname"];
    lastname: AccountInfo["lastname"];
    totalCashAdvanceReceived: number;
}

export type EmployeesCashAdvanceReports = {
    records: EmployeeCashAdvanceReport[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
