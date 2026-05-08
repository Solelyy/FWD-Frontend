import { useQuery } from "@tanstack/react-query";
import { employeesCASummaryApi, Props } from "../api/employeesCASummaryApi";

export function useEmployeesCASummary(month: number, year: number) {
  return useQuery({
    queryKey: ["employees-ca-summary", { month, year }],
    queryFn: () => employeesCASummaryApi({ month, year }),
    retry: 1,
    staleTime: 2 * 60 * 60 * 1000,
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: true,
  });
}
