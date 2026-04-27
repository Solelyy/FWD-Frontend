import { OvertimeStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";
import { LeaveRequestsResponse, LeaveType } from "../types/leave";

// Mock dataset scope: April 2026
export const mockLeaveRequests: LeaveRequestsResponse = {
	leaveRequests: [
		{
			id: "1",
			date: "2026-04-02T09:10:00.000Z",
			leaveType: LeaveType.SICK,
			startDate: "2026-04-04",
			endDate: "2026-04-04",
			status: OvertimeStatus.PENDING,
		},
		{
			id: "2",
			date: "2026-04-05T10:25:00.000Z",
			leaveType: LeaveType.VACATION,
			startDate: "2026-04-15",
			endDate: "2026-04-16",
			status: OvertimeStatus.APPROVED,
		},
		{
			id: "3",
			date: "2026-04-08T14:35:00.000Z",
			leaveType: LeaveType.OTHER,
			startDate: "2026-04-12",
			endDate: "2026-04-12",
			status: OvertimeStatus.REJECTED,
		},
		{
			id: "4",
			date: "2026-04-11T08:55:00.000Z",
			leaveType: LeaveType.ACCUMULATED,
			startDate: "2026-04-20",
			endDate: "2026-04-21",
			status: OvertimeStatus.APPROVED,
		},
		{
			id: "5",
			date: "2026-04-14T16:05:00.000Z",
			leaveType: LeaveType.SICK,
			startDate: "2026-04-18",
			endDate: "2026-04-18",
			status: OvertimeStatus.PENDING,
		},
		{
			id: "6",
			date: "2026-04-17T11:30:00.000Z",
			leaveType: LeaveType.VACATION,
			startDate: "2026-04-25",
			endDate: "2026-04-26",
			status: OvertimeStatus.APPROVED,
		},
		{
			id: "7",
			date: "2026-04-19T13:40:00.000Z",
			leaveType: LeaveType.OTHER,
			startDate: "2026-04-23",
			endDate: "2026-04-23",
			status: OvertimeStatus.REJECTED,
		},
		{
			id: "8",
			date: "2026-04-22T09:45:00.000Z",
			leaveType: LeaveType.ACCUMULATED,
			startDate: "2026-04-29",
			endDate: "2026-04-30",
			status: OvertimeStatus.PENDING,
		},
	],
};
