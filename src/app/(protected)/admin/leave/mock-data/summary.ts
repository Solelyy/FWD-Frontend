import { LeaveStatsResponse } from "../types/leave";

// Mock dataset by month key (YYYY-MM)
export const mockEmployeesLeaveSummary: Record<string, LeaveStatsResponse> = {
	"2026-04": {
		totalRequests: 8,
		pending: 3,
		approved: 3,
		rejected: 2,
	},
	"2026-03": {
		totalRequests: 6,
		pending: 2,
		approved: 3,
		rejected: 1,
	},
	"2026-05": {
		totalRequests: 5,
		pending: 1,
		approved: 3,
		rejected: 1,
	},
};

export const emptyLeaveSummary: LeaveStatsResponse = {
	totalRequests: 0,
	pending: 0,
	approved: 0,
	rejected: 0,
};
