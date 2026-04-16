import { AttendanceStatus, OvertimeStatus } from "@/features/attendance/types/attendanceType"

export const statusStyles: Record<AttendanceStatus, string> = {
    [AttendanceStatus.COMPLETED]: "bg-green-100 text-green-600",
    [AttendanceStatus.IN_PROGRESS]: "bg-yellow-100 text-yellow-600",
    [AttendanceStatus.MISSING_TIMEOUT]: "bg-red-100 text-red-600",
    [AttendanceStatus.NO_RECORD]: "bg-gray-100 text-gray-600",
    [AttendanceStatus.ON_LEAVE]: "bg-blue-100 text-blue-600",
    [AttendanceStatus.SUSPENDED]: "bg-orange-100 text-orange-600"
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
    [OvertimeStatus.APPROVED]: "bg-green-100 text-green-600",
    [OvertimeStatus.PENDING]: "bg-yellow-100 text-yellow-600",
    [OvertimeStatus.REJECTED]: "bg-red-100 text-red-600"
}

export const formatOvertimeText: Record<OvertimeStatus, string> = {
    [OvertimeStatus.APPROVED]: "Overtime Approved",
    [OvertimeStatus.PENDING]: "Overtime Pending",
    [OvertimeStatus.REJECTED]: "Overtime Rejected"
}