import { LeaveType } from "@/app/(protected)/employee/leave/types/leave";
import type { DashboardRequestsResponse } from "../types/requests";
import { ReimbursementType } from "@/app/(protected)/employee/reimbursement/types/reimbursement";

export const mockRequests: DashboardRequestsResponse = {
    requests: [
    {
		id: 1,
		type: "LEAVE",
        leaveType: LeaveType.SICK,
		submittedAt: "2026-04-20T08:30:00.000Z",
		startDate: "2026-04-21T08:30:00.000Z",
        endDate: "2026-04-22T08:30:00.000Z",
		status: "PENDING",
	},
	{
		id: 2,
		type: "CASH_ADVANCE",
		submittedAt: "2026-04-19T10:15:00.000Z",
		status: "APPROVED",
		amount: 5000,
	},
	{
		id: 3,
		type: "REIMBURSEMENT",
		submittedAt: "2026-04-18T14:45:00.000Z",
        reimbursementType: ReimbursementType.FOOD,
		status: "APPROVED",
		amount: 1500,
	},
	{
		id: 4,
		type: "OVERTIME",
		submittedAt: "2026-04-12T17:20:00.000Z",
		status: "PENDING",
	},
	{
		id: 5,
		type: "LEAVE",
        leaveType: LeaveType.VACATION,
		submittedAt: "2026-04-16T09:00:00.000Z",
        startDate: "2026-04-29T08:30:00.000Z",
        endDate: "2026-04-30T08:30:00.000Z",
		status: "REJECTED",
	},
    ]
}
    
