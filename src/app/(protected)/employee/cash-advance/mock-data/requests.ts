import { CashAdvanceRequestStatus, CashAdvanceRequests } from "../types/cash-advance";

// Mock dataset scope: April 2026
export const mockCashAdvanceRequests: CashAdvanceRequests = {
	request: [
		{
			id: 1,
			dateSubmitted: "2026-04-03T09:15:00.000Z",
			amountRequested: 5000,
			amountApproved: 0,
			status: CashAdvanceRequestStatus.PENDING,
		},
		{
			id: 2,
			dateSubmitted: "2026-04-05T13:20:00.000Z",
			amountRequested: 3000,
			amountApproved: 3000,
			status: CashAdvanceRequestStatus.APPROVED,
		},
		{
			id: 3,
			dateSubmitted: "2026-04-08T10:40:00.000Z",
			amountRequested: 4500,
			amountApproved: 0,
			status: CashAdvanceRequestStatus.REJECTED,
		},
		{
			id: 4,
			dateSubmitted: "2026-04-11T08:30:00.000Z",
			amountRequested: 7000,
			amountApproved: 7000,
			status: CashAdvanceRequestStatus.APPROVED,
		},
		{
			id: 5,
			dateSubmitted: "2026-04-14T15:05:00.000Z",
			amountRequested: 2500,
			amountApproved: 0,
			status: CashAdvanceRequestStatus.PENDING,
		},
		{
			id: 6,
			dateSubmitted: "2026-04-17T11:10:00.000Z",
			amountRequested: 6000,
			amountApproved: 6000,
			status: CashAdvanceRequestStatus.APPROVED,
		},
		{
			id: 7,
			dateSubmitted: "2026-04-21T09:55:00.000Z",
			amountRequested: 3800,
			amountApproved: 0,
			status: CashAdvanceRequestStatus.REJECTED,
		},
		{
			id: 8,
			dateSubmitted: "2026-04-24T14:45:00.000Z",
			amountRequested: 5200,
			amountApproved: 0,
			status: CashAdvanceRequestStatus.PENDING,
		},
	],
};
