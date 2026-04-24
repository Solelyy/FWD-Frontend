import { EmployeesCARequestsSummary } from "../types/cash-advance";
import { mockCASummary } from "../mock-data/ca-summary";

export async function employeesCASummaryApi(): Promise<EmployeesCARequestsSummary> {
    return mockCASummary;
}

/*
export async function employeesCASummaryApi(): Promise<EmployeesCARequestsSummary> {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        credentials: "include"
    });

    const result = await response.json();

    if(!response.ok) {
        throw new Error(result.message || "Unable to fetch employees cash advance requests summary.")
    }
    return result;
}
*/