import { EmployeesReimbursementReports } from "../types/reimbursement";
import { mockEmployeesReimbursementReportsByWeek } from "../mock-data/reimbursement";

export type ReimbursementPayload = {
    month: number;
    year: number;
    week: "week-1" | "week-2" | "week-3" | "week-4";
};

export async function getReimbursementApi({
    month,
    year,
    week,
}: ReimbursementPayload): Promise<EmployeesReimbursementReports> {
    void month;
    void year;

    return mockEmployeesReimbursementReportsByWeek[week];
}

/*
export async function getReimbursementApi({
    month,
    year,
    week,
}: ReimbursementPayload): Promise<EmployeesReimbursementReports> {
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
        throw new Error("Unable to fetch employees reimbursement report.");
    }

    return result;
}
*/