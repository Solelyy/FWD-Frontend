import { AccountInfo } from "@/features/account-management/types/account";
import { AttendanceStatus, OvertimeStatus } from "@/features/attendance/types/attendanceType";

export enum AttendanceStatusFilter {
  ALL = "ALL",
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  ON_LEAVE = "ON_LEAVE",
  OVERTIME_REQUEST = "OVERTIME_REQUEST",
  MISSING_TIMEOUT = "MISSING_TIMEOUT",
}

export type EmployeeAttendance = {
    id: string;
    employeeId: AccountInfo["employeeId"];
    firstname: AccountInfo["firstname"];
    lastname: AccountInfo["lastname"]
    timein: {
        timestamp: string;
        image: string;
        location: string;
    }
    timeout: {
        timestamp: string;
        image: string;
        location: string;
    }
    status: AttendanceStatus
    overtimeStatus?: OvertimeStatus
}

export type EmployeesAttendanceResponse = {
    logs : EmployeeAttendance[];

    meta: {
        page: number;
        limit: number;
        total: number
    }
}