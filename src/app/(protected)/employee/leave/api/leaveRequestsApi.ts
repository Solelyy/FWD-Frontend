import { LeaveRequestsResponse } from "../types/leave";
import { mockLeaveRequests } from "../mock-data/requests";
import { API_BASE_URL } from "@/lib/util/api";

export async function leaveRequestsApi(): Promise<LeaveRequestsResponse> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    return mockLeaveRequests;
  }

  const endpoint = "/employee/leave-requests";
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch leave requests.");
  }

  const result = await response.json();
  console.log("Leave Requests: ", result);
  return result;
}
