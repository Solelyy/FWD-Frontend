import { useQuery } from "@tanstack/react-query";
import {
    getReimbursementApi,
    ReimbursementPayload,
} from "../api/getReimbursementApi";

export function useReimbursementReports({
    month,
    year,
    week,
}: ReimbursementPayload) {
    return useQuery({
        queryKey: ["employees-reimbursement-report", { month, year, week }],
        queryFn: () => getReimbursementApi({ month, year, week }),
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false,
    });
}
