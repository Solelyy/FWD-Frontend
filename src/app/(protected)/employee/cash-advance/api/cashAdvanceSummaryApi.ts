import { API_BASE_URL } from "@/lib/util/api";
import { CashAdvanceSummary } from "../types/cash-advance";
import { mockSummary } from "../mock-data/summary";

export async function cashAdvanceSummaryApi(): Promise<CashAdvanceSummary> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    return mockSummary;
  }

  const response = await fetch(
    `${API_BASE_URL}/employee/cash-advance-summary`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Unable to fetch cash advance summary.");
  }

  const result = await response.json();
  console.log("CA Summary: ", result);
  return result;
}
