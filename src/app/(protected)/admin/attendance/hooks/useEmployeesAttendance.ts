"use client"

import { useQuery } from "@tanstack/react-query"
import { employeeAttendanceApi } from "../api/employeeAttendanceApi"
import { EmployeeAttendanceProps } from "../api/employeeAttendanceApi"
import { getMockEmployeesAttendance } from "../mock-data/employeesAttendance"

export function useEmployeeAttendance({page, limit, year, month, day, filter}: EmployeeAttendanceProps) {

    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
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
        placeholderData: (prev) => prev,
    })
} 