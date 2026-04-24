import { API_BASE_URL } from "@/lib/util/api";
import { EmployeeLeaveBalances } from "../types/leave-balances";

export async function employeesLeaveBalancesApi(): Promise<EmployeeLeaveBalances> {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        credentials: "include"
    });

    const result = await response.json();
    console.log("Employee Leave Balances", result);

    if(!response.ok) {
        throw new Error ("Unable to fetch employee leave balances.");
    }

    return result;
}