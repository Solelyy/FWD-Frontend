import { EmployeesLeaveReports } from "../types/leave";
import { mockEmployeesLeaveReports } from "../mock-data/leave";
import { API_BASE_URL } from "@/lib/util/api";

export type LeavePayload = {
  month: number;
  year: number;
};

export async function getLeaveApi({
  month,
  year,
}: LeavePayload): Promise<EmployeesLeaveReports> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    return mockEmployeesLeaveReports;
  }

  const endpoint = `/leave-reports?month=${month + 1}&year=${year}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
