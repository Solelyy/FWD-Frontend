import { API_BASE_URL } from "@/lib/util/api";
import { EmployeesCARequestsResponse } from "../types/cash-advance";

export async function employeesCARequestsApi(): Promise<EmployeesCARequestsResponse>{
    const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        credentials: "include"
    });

    const result = await response.json();

    if(!response.ok) {
        throw new Error(result.message || "Unable to fetch employees cash advance requests.")
    }
    return result;
}