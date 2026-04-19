import { useQuery } from "@tanstack/react-query";
import { CashAdvanceRequestStatus, CashAdvanceRequests } from "../types/cash-advance";

const mockCashAdvanceRequests: CashAdvanceRequests = {
    request: [
        {
            id: 1,
            dateSubmitted: "2026-04-01",
            amountRequested: 5000,
            amountApproved: 5000,
            status: CashAdvanceRequestStatus.APPROVED,
        },
        {
            id: 2,
            dateSubmitted: "2026-04-10",
            amountRequested: 3000,
            amountApproved: 0,
            status: CashAdvanceRequestStatus.PENDING,
        },
        {
            id: 3,
            dateSubmitted: "2026-04-15",
            amountRequested: 7000,
            amountApproved: 0,
            status: CashAdvanceRequestStatus.REJECTED,
        },
    ],
};

export function useCashAdvanceRequests() {
    return useQuery({
        queryKey: ["cash-advance-requests"],
        queryFn: async () => mockCashAdvanceRequests,
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false
    });
}

{/* 
export function useCashAdvanceRequests() {
    return useQuery({
        queryKey: ["cash-advance-requests"],
        queryFn: cashAdvanceRequestsApi,
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false
    });
}*/}