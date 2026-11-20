import { CashAdvanceRequests } from "../types/cash-advance";
import { mockCashAdvanceRequests } from "../mock-data/requests";

export async function cashAdvanceRequestsApi(): Promise<CashAdvanceRequests> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    return mockCashAdvanceRequests;
  }

  const endpoint = "/api/employee/cash-advance-requests";
  const response = await fetch(`${endpoint}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch cash advance requests.");
  }

  const result = await response.json();
  console.log("CA Requests: ", result);
  return result;
}
