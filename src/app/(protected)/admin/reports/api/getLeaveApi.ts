import { EmployeesLeaveReports } from "../types/leave";
import { mockEmployeesLeaveReports } from "../mock-data/leave";

export type LeavePayload = {
  month: number;
  year: number;
  page: number;
  limit: number;
};

export async function getLeaveApi({
  month,
  year,
  page,
  limit,
}: LeavePayload): Promise<EmployeesLeaveReports> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    const start = (page - 1) * limit;
    return {
      ...mockEmployeesLeaveReports,
      records: mockEmployeesLeaveReports.records.slice(start, start + limit),
      meta: {
        page,
        limit,
        total: mockEmployeesLeaveReports.records.length,
      },
    };
  }

  const endpoint = `/api/admin/leave-reports?month=${month + 1}&year=${year}&page=${page}&limit=${limit}`;
  const response = await fetch(`${endpoint}`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Unable to fetch employees leave report.",
    );
  }

  return result;
}
