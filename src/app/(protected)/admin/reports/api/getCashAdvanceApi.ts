import { API_BASE_URL } from "@/lib/util/api";
import { EmployeesCashAdvanceReports } from "../types/cash-advance";

export type CashAdvancePayload = {
    month: number;
    year: number;
    week: "week-1" | "week-2" | "week-3" | "week-4";
};

export async function getCashAdvanceApi({ month, year, week }: CashAdvancePayload): Promise<EmployeesCashAdvanceReports> {
    const endpoint = "";

    const response = await fetch(
        `${API_BASE_URL}${endpoint}?month=${month}&year=${year}&week=${week}`,
        {
            method: "GET",
            credentials: "include",
        },
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error("Unable to fetch employees cash advance report.");
    }

    return result;
}
