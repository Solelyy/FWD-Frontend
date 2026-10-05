import { AttendanceStatus, OvertimeStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType"
import {
    AttendanceStatusFilter,
    EmployeesAttendanceResponse,
} from "../types/attendance-types"
import { EmployeeAttendanceProps } from "../api/employeeAttendanceApi"

export const mockEmployeesAttendance: EmployeesAttendanceResponse["logs"] = [
    {
        attendanceId: 1,
        employeeId: "EMP-1001",
        firstname: "Alyssa",
        lastname: "Cruz",
        timeIn: {
            timestamp: "2026-04-15T08:04:00.000Z",
            image: "/assets/mock/timein-1.jpg",
            location: "Manila HQ",
        },
        timeOut: {
            timestamp: "2026-04-15T18:45:00.000Z",
            image: "/assets/mock/timeout-1.jpg",
            location: "Manila HQ",
        },
        status: AttendanceStatus.COMPLETED,
        overtimeStatus: OvertimeStatus.APPROVED,
        isChanged: true,
        changes: {
            adminFirstname: "Jessa",
            adminLastname: "Gozun",
            timestamp: "2026-04-15T08:04:00.000Z",
            reason: "Wala lang",
        },
    },
    {
        attendanceId: 2,
        employeeId: "EMP-1002",
        firstname: "Marco",
        lastname: "Reyes",
        timeIn: {
            timestamp: "2026-04-15T08:17:00.000Z",
            image: "/assets/mock/timein-2.jpg",
            location: "Cebu Branch",
        },
        timeOut: {
            timestamp: "",
            image: "",
            location: "",
        },
        status: AttendanceStatus.IN_PROGRESS,
        overtimeStatus: OvertimeStatus.PENDING,
        isChanged: true,
        changes: {
            adminFirstname: "Jessa",
            adminLastname: "Gozun",
            timestamp: "2026-04-15T08:04:00.000Z",
            reason: "Wala lang",
        },
    },
    {
        attendanceId: 3,
        employeeId: "EMP-1003",
        firstname: "Lea",
        lastname: "Santos",
        timeIn: {
            timestamp: "",
            image: "",
            location: "",
        },
        timeOut: {
            timestamp: "",
            image: "",
            location: "",
        },
        status: AttendanceStatus.ON_LEAVE,
        isChanged: false,
        changes: {
            adminFirstname: "",
            adminLastname: "",
            timestamp: "",
            reason: "",
        },
    },
    {
        attendanceId: 4,
        employeeId: "EMP-1004",
        firstname: "Jared",
        lastname: "Dizon",
        timeIn: {
            timestamp: "",
            image: "",
            location: "",
        },
        timeOut: {
            timestamp: "",
            image: "",
            location: "",
        },
        status: AttendanceStatus.NO_RECORD,
        isChanged: false,
        changes: {
            adminFirstname: "",
            adminLastname: "",
            timestamp: "",
            reason: "",
        },
    },
    {
        attendanceId: 5,
        employeeId: "EMP-1005",
        firstname: "Nicole",
        lastname: "Ramos",
        timeIn: {
            timestamp: "2026-04-15T08:11:00.000Z",
            image: "/assets/mock/timein-5.jpg",
            location: "Davao Office",
        },
        timeOut: {
            timestamp: "",
            image: "",
            location: "",
        },
        status: AttendanceStatus.MISSING_TIMEOUT,
        overtimeStatus: OvertimeStatus.REJECTED,
        isChanged: false,
        changes: {
            adminFirstname: "",
            adminLastname: "",
            timestamp: "",
            reason: "",
        },
    },
]

export function getMockEmployeesAttendance({
    page,
    limit,
    filter,
}: EmployeeAttendanceProps): EmployeesAttendanceResponse {
    const filteredLogs = mockEmployeesAttendance.filter((log) => {
        switch (filter) {
            case AttendanceStatusFilter.PRESENT:
                return (
                    log.status === AttendanceStatus.COMPLETED ||
                    log.status === AttendanceStatus.IN_PROGRESS
                )
            case AttendanceStatusFilter.ABSENT:
                return log.status === AttendanceStatus.NO_RECORD
            case AttendanceStatusFilter.ON_LEAVE:
                return log.status === AttendanceStatus.ON_LEAVE
            case AttendanceStatusFilter.OVERTIME_REQUEST:
                return Boolean(log.overtimeStatus)
            case AttendanceStatusFilter.MISSING_TIMEOUT:
                return log.status === AttendanceStatus.MISSING_TIMEOUT
            case AttendanceStatusFilter.ALL:
            default:
                return true
        }
    })

    const start = (page - 1) * limit
    const end = start + limit

    return {
        logs: filteredLogs.slice(start, end),
        meta: {
            page,
            limit,
            total: filteredLogs.length,
        },
    }
}
