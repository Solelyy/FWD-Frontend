"use client"

import { useQuery } from "@tanstack/react-query"
import { employeeAttendanceApi } from "../api/employeeAttendanceApi"
import { EmployeeAttendanceProps } from "../api/employeeAttendanceApi"

export function useEmployeeAttendance({page, limit, year, month, day, filter}: EmployeeAttendanceProps) {
    return useQuery({
        queryKey: ["employees-attendance", {page, limit, year, month, day, filter}],
        queryFn: ()=> employeeAttendanceApi({page, limit, month,year, day, filter}),
        retry: 1,
        refetchOnWindowFocus: true,
        staleTime: 5 * 60 * 1000,
    })
}