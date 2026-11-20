import { LeaveStatsResponse } from "../types/leave";
import {
  mockEmployeesLeaveSummary,
} from "../mock-data/summary";

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
  const endpoint = `/api/admin/employee/leave-summary?year=${year}&month=${month + 1}`;
  const response = await fetch(`${endpoint}`, {
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
