import { EmployeesCARequestsSummary } from "../types/cash-advance";
import { API_BASE_URL } from "@/lib/util/api";
import { mockCASummary } from "../mock-data/ca-summary";

export type Props = {
  year: number;
  month: number;
};

export async function employeesCASummaryApi({
  year,
  month,
}: Props): Promise<EmployeesCARequestsSummary> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    return mockCASummary;
  }

  const endpoint = `/admin/employee/cash-advance-summary?year=${year}&month=${month + 1}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  console.log("CA Summary: ", result);

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Unable to fetch employees cash advance requests summary.",
    );
  }
  return result;
}
