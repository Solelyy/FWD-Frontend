import { AttendanceStatus, OvertimeStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType"

export const statusStyles: Record<AttendanceStatus, string> = {
    [AttendanceStatus.COMPLETED]: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300",
    [AttendanceStatus.IN_PROGRESS]: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300",
    [AttendanceStatus.MISSING_TIMEOUT]: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-300",
    [AttendanceStatus.NO_RECORD]: "border-border bg-muted text-muted-foreground",
    [AttendanceStatus.ON_LEAVE]: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/50 dark:bg-sky-950/30 dark:text-sky-300",
    [AttendanceStatus.SUSPENDED]: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
}

export const formatStatusText: Record<AttendanceStatus, string> = {
    [AttendanceStatus.COMPLETED]: "Complete Attendance",
    [AttendanceStatus.IN_PROGRESS]: "Clocked In",
    [AttendanceStatus.MISSING_TIMEOUT]: "Missing Timeout",
    [AttendanceStatus.NO_RECORD]: "No Attendance",
    [AttendanceStatus.ON_LEAVE]: "On Leave",
    [AttendanceStatus.SUSPENDED]: "Suspended"
}

export const overtimeStatusStyle: Record<OvertimeStatus, string> = {
    [OvertimeStatus.APPROVED]: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300",
    [OvertimeStatus.PENDING]: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300",
    [OvertimeStatus.REJECTED]: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
}

export const formatOvertimeText: Record<OvertimeStatus, string> = {
    [OvertimeStatus.APPROVED]: "Overtime Approved",
    [OvertimeStatus.PENDING]: "Overtime Pending",
    [OvertimeStatus.REJECTED]: "Overtime Rejected"
}