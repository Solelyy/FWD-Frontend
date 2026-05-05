/*
export type EmployeeAttendance = {
    attendanceId: number
    employeeId: AccountInfo["employeeId"];
    firstname: AccountInfo["firstname"];
    lastname: AccountInfo["lastname"]
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

*/

import { AttendanceStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";
import { EmployeesAttendanceResponse } from "../types/attendance-types";

export const mockAttendance: EmployeesAttendanceResponse["logs"]= [
    {
        attendanceId: 1,
        employeeId: "FWD123",
        firstname: "Jessa",
        lastname: "Gozun",
        timeIn: {
            timestamp: "2026-04-07T08:55:00.000Z",
            image: "",
            location: "Quezon City"
        },
        timeOut: {
            timestamp: "2026-04-07T08:55:00.000Z",
            image: "",
            location: "Quezon City"
        },
        status: AttendanceStatus.COMPLETED,
    }
]