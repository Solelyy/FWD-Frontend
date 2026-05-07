import { AccountInfo } from "@/features/account-management/types/account";
import { AttendanceStatus, OvertimeStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";
import { AttendanceActions } from "./actions";

export enum AttendanceStatusFilter {
  ALL = "ALL",
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  ON_LEAVE = "ON_LEAVE",
  OVERTIME_REQUEST = "OVERTIME_REQUEST",
  MISSING_TIMEOUT = "MISSING_TIMEOUT",
}

export type EmployeeAttendance = {
    attendanceId: number
    employeeId: AccountInfo["employeeId"];
    firstname: AccountInfo["firstname"];
    lastname: AccountInfo["lastname"];
    timeIn: {
        timestamp: string;
        image: string;
        location: string;
    }
    timeOut: {
        timestamp: string;
        image: string;
        location: string;
    }
    status: AttendanceStatus;
    overtimeStatus?: OvertimeStatus;
    isChanged: boolean;
    changes : {
        adminFirstname: string;
        adminLastname: string;
        timestamp: string;
        reason: string
    }
}

export type EmployeesAttendanceResponse = {
    logs : EmployeeAttendance[];

    meta: {
        page: number;
        limit: number;
        total: number
    }
}

export type EmployeesAttendanceStatsResponse = {
    presentToday: number,
    absentToday: number,
    onLeave: number, 
    pendingOvertime: number
}