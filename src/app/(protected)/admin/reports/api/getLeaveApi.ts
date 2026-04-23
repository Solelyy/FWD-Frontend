import { API_BASE_URL } from "@/lib/util/api";
import { EmployeesLeaveReports } from "../types/leave";

export type LeavePayload = {
    month: number;
    year: number;
};

export async function getLeaveApi({ month, year }: LeavePayload): Promise<EmployeesLeaveReports> {
    const endpoint = "";

    const response = await fetch(`${API_BASE_URL}${endpoint}?month=${month}&year=${year}`, {
        method: "GET",
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error("Unable to fetch employees leave report.");
    }

    return result;
}
