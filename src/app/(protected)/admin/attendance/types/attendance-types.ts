import { AttendanceStatus } from "@/features/attendance/types/attendanceType";

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
    employeeName: {
        firstname: string;
        lastname: string
    }
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
}

export type EmployeesAttendanceResponse = {
    logs : EmployeeAttendance[];

    meta: {
        page: number;
        limit: number;
        total: number
    }
}