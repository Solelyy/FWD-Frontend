import {
  LeaveStatusFilter,
  LeaveRequestsResponse,
  LeaveRequestStatus,
} from "../types/leave";
import { mockEmployeesLeaveRequests } from "../mock-data/requests";
import { API_BASE_URL } from "@/lib/util/api";

export type LeaveRequestsProps = {
  page: number;
  limit: number;
  year: number;
  month: number;
  filter: LeaveStatusFilter;
};

const statusFilterMap: Record<
  Exclude<LeaveStatusFilter, LeaveStatusFilter.ALL>,
  LeaveRequestStatus
> = {
  [LeaveStatusFilter.PENDING]: LeaveRequestStatus.PENDING,
  [LeaveStatusFilter.APPROVED]: LeaveRequestStatus.APPROVED,
  [LeaveStatusFilter.REJECTED]: LeaveRequestStatus.REJECTED,
};

export async function employeesLeaveRequestsApi({
  page,
  limit,
  year,
  month,
  filter,
}: LeaveRequestsProps): Promise<LeaveRequestsResponse> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    const targetYear = String(year);
    const targetMonth = String(month + 1).padStart(2, "0");

    const monthFiltered = mockEmployeesLeaveRequests.filter((request) => {
      return request.startDate.startsWith(`${targetYear}-${targetMonth}`);
    });
    const availableRequests =
      monthFiltered.length > 0 ? monthFiltered : mockEmployeesLeaveRequests;

    const statusFiltered =
      filter === LeaveStatusFilter.ALL
        ? availableRequests
        : availableRequests.filter(
            (request) => request.status === statusFilterMap[filter],
          );

    const safePage = Math.max(page, 1);
    const safeLimit = Math.max(limit, 1);
    const startIndex = (safePage - 1) * safeLimit;
    const paged = statusFiltered.slice(startIndex, startIndex + safeLimit);

    return {
      logs: paged,
      meta: {
        page: safePage,
        limit: safeLimit,
        total: statusFiltered.length,
      },
    };
  }

  const endpoint = `/admin/employee/leave?year=${year}&month=${month + 1}&page=${page}&limit=${limit}&filter=${filter}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Cannot fetch employees leave requests.");

  const result = await response.json();
  console.log("Fetched leave requests: ", result);

  return result;
}
