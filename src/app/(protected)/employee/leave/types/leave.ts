import { OvertimeStatus } from "@/features/attendance/types/attendanceType";

export type LeaveBalancesResponse = {
    sickLeaveBalance: number;
    vacationLeaveBalance: number;
    accumulatedLeave: number
}

export enum LeaveType {
    SICK = "SICK",
    VACATION = "VACATION",
    ACCUMULATED = "ACCUMULATED",
    OTHER = "OTHER"
}

export type LeaveRequest = {
    id: string;
    date: string;
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    status: OvertimeStatus
}

export type LeaveRequestsResponse = {
    leaveRequests: LeaveRequest[];
}