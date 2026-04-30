import { useQuery } from "@tanstack/react-query";
import { employeesCASummaryApi, Props } from "../api/employeesCASummaryApi";

export function useEmployeesCASummary({month, year}: Props) {
    return useQuery({
        queryKey: ["employees-ca-summary"],
        queryFn: () => employeesCASummaryApi({month, year}),
        staleTime: 2 * 60 * 60 * 1000,
        placeholderData: (prev) => prev,
        refetchOnWindowFocus: false 
    })
}