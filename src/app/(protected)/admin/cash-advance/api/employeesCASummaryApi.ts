import { EmployeesCARequestsSummary } from "../types/cash-advance";
import { mockCASummary } from "../mock-data/ca-summary";
import { API_BASE_URL } from "@/lib/util/api";
/*
export async function employeesCASummaryApi(): Promise<EmployeesCARequestsSummary> {
    return mockCASummary;
}
*/
export type Props = {
    year: number,
    month: number
}

export async function employeesCASummaryApi({year, month}: Props): Promise<EmployeesCARequestsSummary> {
    const endpoint = `/admin/employee/cash-advance-summary?year=${year}&month=${month+1}`
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
    });

    const result = await response.json();

    console.log("CA Summary: ", result);

    if(!response.ok) {
        throw new Error(result.message || "Unable to fetch employees cash advance requests summary.")
    }
    return result;
}
