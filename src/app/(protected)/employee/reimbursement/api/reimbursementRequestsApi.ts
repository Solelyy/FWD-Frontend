import { ReimbursementRequests } from "../types/reimbursement";
import { mockReimbursementRequests } from "../mock-data/requests";

export async function reimbursementRequestsApi(): Promise<ReimbursementRequests> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    return mockReimbursementRequests;
  }

  const response = await fetch(
    `/api/employee/reimbursement-requests`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Unable to fetch reimbursement requests.");
  }

  const result = await response.json();
  console.log("Reimbursement Requests: ", result);
  return result;
}
