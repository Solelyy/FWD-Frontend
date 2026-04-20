import { API_BASE_URL } from "@/lib/util/api";
import { EmployeesCARequestsResponse } from "../types/cash-advance";
import { LeaveRequestsProps } from "../../leave/api/employeesLeaveRequests";

export async function employeesCARequestsApi({page, limit, year, month, filter}: LeaveRequestsProps): Promise<EmployeesCARequestsResponse>{
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