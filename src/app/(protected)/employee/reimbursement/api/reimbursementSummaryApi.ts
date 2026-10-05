import { API_BASE_URL } from "@/lib/util/api";
import { ReimbursementSummary } from "../types/reimbursement";
import { mockSummary } from "../mock-data/summary";

export async function reimbursementSummaryApi(): Promise<ReimbursementSummary> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    return mockSummary;
  }

  const response = await fetch(
    `${API_BASE_URL}/employee/reimbursement-summary`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Unable to fetch reimbursement summary.");
  }

  const result = await response.json();
  console.log("Reimbursement Summary: ", result);
  return result;
}
