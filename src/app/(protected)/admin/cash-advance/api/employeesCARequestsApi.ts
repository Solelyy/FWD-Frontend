import { EmployeesCARequestsResponse } from "../types/cash-advance";
import { LeaveRequestsProps } from "../../leave/api/employeesLeaveRequests";
import { API_BASE_URL } from "@/lib/util/api";
import { CashAdvanceRequestStatus } from "@/app/(protected)/employee/cash-advance/types/cash-advance";
import { LeaveStatusFilter } from "../../leave/types/leave";
import { mockEmployeesCARequests } from "../mock-data/ca-requests";

const statusFilterMap: Record<
  Exclude<LeaveStatusFilter, LeaveStatusFilter.ALL>,
  CashAdvanceRequestStatus
> = {
  [LeaveStatusFilter.PENDING]: CashAdvanceRequestStatus.PENDING,
  [LeaveStatusFilter.APPROVED]: CashAdvanceRequestStatus.APPROVED,
  [LeaveStatusFilter.REJECTED]: CashAdvanceRequestStatus.REJECTED,
};

export async function employeesCARequestsApi({
  page,
  limit,
  year,
  month,
  filter,
}: LeaveRequestsProps): Promise<EmployeesCARequestsResponse> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    const filtered =
      filter === LeaveStatusFilter.ALL
        ? mockEmployeesCARequests
        : mockEmployeesCARequests.filter(
            (request) => request.status === statusFilterMap[filter],
          );

    const safePage = Math.max(page, 1);
    const safeLimit = Math.max(limit, 1);
    const start = (safePage - 1) * safeLimit;
    const end = start + safeLimit;

    return {
      logs: filtered.slice(start, end),
      meta: {
        page: safePage,
        limit: safeLimit,
        total: filtered.length,
      },
    };
  }

  const endpoint = `/admin/employee/cash-advance-requests?year=${year}&month=${month + 1}&page=${page}&limit=${limit}&filter=${filter}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  console.log("CA Requests: ", result);

  if (!response.ok) {
    throw new Error(
      result.message || "Unable to fetch employees cash advance requests.",
    );
  }
  return result;
}
