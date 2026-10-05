import { LeaveStatsResponse } from "../types/leave";
import {
  mockEmployeesLeaveSummary,
} from "../mock-data/summary";
import { API_BASE_URL } from "@/lib/util/api";

type Payload = {
  month: number;
  year: number;
};

export async function employeesLeaveStatsApi({
  month,
  year,
}: Payload): Promise<LeaveStatsResponse> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
    return (
      mockEmployeesLeaveSummary[monthKey] ??
      Object.values(mockEmployeesLeaveSummary)[0]
    );
  }
  const endpoint = `/admin/employee/leave-summary?year=${year}&month=${month + 1}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Cannot fetch leave summary for this month.");
  }
  const result = await response.json();
  console.log("Fetched leave summary: ", result);

  return result;
}
