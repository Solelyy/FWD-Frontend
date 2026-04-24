import { API_BASE_URL } from "@/lib/util/api";
import { EmployeeLeaveBalances, EmployeesLeaveBalancesResponse } from "../types/leave-balances";

export async function employeesLeaveBalancesApi(): Promise<EmployeesLeaveBalancesResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/employee/leave-balances`, {
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