import { useQuery } from "@tanstack/react-query";
import { leaveRequestsApi } from "../api/leaveRequestsApi";
import { OvertimeStatus } from "@/features/attendance/types/attendanceType";
import { LeaveRequestsResponse, LeaveType } from "../types/leave";

const mockLeaveRequests: LeaveRequestsResponse = {
    leaveRequests: [
        {
            id: "mock-leave-1",
            date: "2026-04-10T09:15:00.000Z",
            leaveType: LeaveType.VACATION,
            startDate: "2026-04-22",
            endDate: "2026-04-24",
            status: OvertimeStatus.PENDING,
        },
        {
            id: "mock-leave-2",
            date: "2026-03-27T08:30:00.000Z",
            leaveType: LeaveType.SICK,
            startDate: "2026-03-30",
            endDate: "2026-03-31",
            status: OvertimeStatus.APPROVED,
        },
        {
            id: "mock-leave-3",
            date: "2026-02-18T14:20:00.000Z",
            leaveType: LeaveType.OTHER,
            startDate: "2026-02-20",
            endDate: "2026-02-20",
            status: OvertimeStatus.REJECTED,
        },
    ],
};

export function useLeaveRequests() {
    if (process.env.NODE_ENV === "development") {
        return useQuery({
            queryKey: ["leave-requests", "mock"],
            queryFn: async () => mockLeaveRequests,
            retry: 0,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        });
    }

    return useQuery({
        queryKey: ["leave-requests"],
        queryFn: leaveRequestsApi,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 2 * 60 * 60 * 1000, // 2hrs
    });
}