import { API_BASE_URL } from "@/lib/util/api";
import { EmployeesCARequestsSummary } from "../types/cash-advance";

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