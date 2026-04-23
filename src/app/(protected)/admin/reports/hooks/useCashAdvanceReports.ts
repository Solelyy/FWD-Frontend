import { useQuery } from "@tanstack/react-query";
import { CashAdvancePayload, getCashAdvanceApi } from "../api/getCashAdvanceApi";

export function useCashAdvanceReports({ month, year, week }: CashAdvancePayload) {
    return useQuery({
        queryKey: ["employees-cash-advance-report", { month, year, week }],
        queryFn: () => getCashAdvanceApi({ month, year, week }),
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false,
    });
}
