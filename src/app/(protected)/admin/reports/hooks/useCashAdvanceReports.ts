import { useQuery } from "@tanstack/react-query";
import { CashAdvancePayload, getCashAdvanceApi } from "../api/getCashAdvanceApi";

export function useCashAdvanceReports({ month, year, week, page, limit }: CashAdvancePayload) {
    return useQuery({
        queryKey: ["employees-cash-advance-report", { month, year, week, page, limit }],
        queryFn: () => getCashAdvanceApi({ month, year, week, page, limit }),
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false,
    });
}
