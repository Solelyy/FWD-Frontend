import { AccountInfo } from "@/features/account-management/types/account"

export interface EmployeeBasicInfo {
    employeeId: AccountInfo["employeeId"];
    firstname: AccountInfo["firstname"];
    lastname: AccountInfo["lastname"];
}

export interface EmployeeAttendance extends EmployeeBasicInfo {
    presentDays: number;
    absentDays: number;
    late: number;
    undertime: number;
    overtimeHours: number;
    totalWorkingHours: number;
    totalPayableHours: number;
}

export type EmployeeAttendances = {
    records: EmployeeAttendance[];
    meta: {
        page: number
        limit: number
        total: number
    }
}