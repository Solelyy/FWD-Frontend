import { EmployeesCashAdvanceReports } from "../types/cash-advance";
import { mockEmployeesCashAdvanceReportsByWeek } from "../mock-data/cash-advance";
import { API_BASE_URL } from "@/lib/util/api";

export type CashAdvancePayload = {
  month: number;
  year: number;
  week: "week-1" | "week-2" | "week-3" | "week-4";
  page: number;
  limit: number;
};

export async function getCashAdvanceApi({
  month,
  year,
  week,
  page,
  limit,
}: CashAdvancePayload): Promise<EmployeesCashAdvanceReports> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    const report = mockEmployeesCashAdvanceReportsByWeek[week];
    const start = (page - 1) * limit;
    return {
      ...report,
      records: report.records.slice(start, start + limit),
      meta: { page, limit, total: report.records.length },
    };
  }

  const weekNumber = Number(week.replace("week-", ""));
  const endpoint = `/cash-advances?month=${month + 1}&year=${year}&week=${weekNumber}&page=${page}&limit=${limit}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Unable to fetch employees cash advance report.",
    );
  }

  return result;
}
