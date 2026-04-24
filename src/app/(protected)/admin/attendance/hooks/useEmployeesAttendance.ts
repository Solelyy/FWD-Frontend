"use client"

import { useQuery } from "@tanstack/react-query"
import { employeeAttendanceApi } from "../api/employeeAttendanceApi"
import { EmployeeAttendanceProps } from "../api/employeeAttendanceApi"
import { AttendanceStatusFilter, EmployeesAttendanceResponse } from "../types/attendance-types"
import { AttendanceStatus, OvertimeStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType"

/*
const MOCK_ATTENDANCE_LOGS: EmployeesAttendanceResponse["logs"] = [
    {
        id: 1,
        employeeId: "EMP-1001",
        firstname: "Alyssa",
        lastname: "Cruz",
        timein: {
            timestamp: "2026-04-15T08:04:00.000Z",
            image: "/assets/mock/timein-1.jpg",
            location: "Manila HQ",
        },
        timeout: {
            timestamp: "2026-04-15T18:45:00.000Z",
            image: "/assets/mock/timeout-1.jpg",
            location: "Manila HQ",
        },
        status: AttendanceStatus.COMPLETED,
        overtimeStatus: OvertimeStatus.APPROVED,
    },
    {
        id: 2,
        employeeId: "EMP-1002",
        firstname: "Marco",
        lastname: "Reyes",
        timein: {
            timestamp: "2026-04-15T08:17:00.000Z",
            image: "/assets/mock/timein-2.jpg",
            location: "Cebu Branch",
        },
        timeout: {
            timestamp: "",
            image: "",
            location: "",
        },
        status: AttendanceStatus.IN_PROGRESS,
        overtimeStatus: OvertimeStatus.PENDING,
    },
    {
        id: 3,
        employeeId: "EMP-1003",
        firstname: "Lea",
        lastname: "Santos",
        timein: {
            timestamp: "",
            image: "",
            location: "",
        },
        timeout: {
            timestamp: "",
            image: "",
            location: "",
        },
        status: AttendanceStatus.ON_LEAVE,
    },
    {
        id: 4,
        employeeId: "EMP-1004",
        firstname: "Jared",
        lastname: "Dizon",
        timein: {
            timestamp: "",
            image: "",
            location: "",
        },
        timeout: {
            timestamp: "",
            image: "",
            location: "",
        },
        status: AttendanceStatus.NO_RECORD,
    },
    {
        id: 5,
        employeeId: "EMP-1005",
        firstname: "Nicole",
        lastname: "Ramos",
        timein: {
            timestamp: "2026-04-15T08:11:00.000Z",
            image: "/assets/mock/timein-5.jpg",
            location: "Davao Office",
        },
        timeout: {
            timestamp: "",
            image: "",
            location: "",
        },
        status: AttendanceStatus.MISSING_TIMEOUT,
        overtimeStatus: OvertimeStatus.REJECTED,
    },
]

function getMockEmployeesAttendance({ page, limit, filter }: EmployeeAttendanceProps): EmployeesAttendanceResponse {
    const filteredLogs = MOCK_ATTENDANCE_LOGS.filter((log) => {
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

export function useEmployeeAttendance({page, limit, year, month, day, filter}: EmployeeAttendanceProps) {

    if (process.env.NODE_ENV === "development") {
        return useQuery({
            queryKey: ["employees-attendance", "mock", {page, limit, year, month, day, filter}],
            queryFn: async () => getMockEmployeesAttendance({ page, limit, year, month, day, filter }),
            retry: 0,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        })
    }

    return useQuery({
        queryKey: ["employees-attendance", {page, limit, year, month, day, filter}],
        queryFn: ()=> employeeAttendanceApi({page, limit, month,year, day, filter}),
        retry: 1,
        refetchOnWindowFocus: true,
        staleTime: 5 * 60 * 1000,
    })
} */

export function useEmployeeAttendance({page, limit, year, month, day, filter}: EmployeeAttendanceProps) {
    return useQuery({
        queryKey: ["employees-attendance", {page, limit, year, month, day, filter}],
        queryFn: ()=> employeeAttendanceApi({page, limit, month,year, day, filter}),
        refetchOnWindowFocus: true,
        staleTime: 5 * 60 * 1000,
        placeholderData: (prev) => prev,
    })
} 