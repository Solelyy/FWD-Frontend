import { EmployeesReimbursementReports } from "../types/reimbursement";
import { mockEmployeesReimbursementReportsByWeek } from "../mock-data/reimbursement";
import { API_BASE_URL } from "@/lib/util/api";

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
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    return mockEmployeesReimbursementReportsByWeek[week];
  }

  const weekNumber = Number(week.replace("week-", ""));
  const endpoint = `/cash-reimbursements?month=${month + 1}&year=${year}&week=${weekNumber}&page=1&limit=10`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Unable to fetch employees reimbursement report.",
    );
  }

  return result;
}
