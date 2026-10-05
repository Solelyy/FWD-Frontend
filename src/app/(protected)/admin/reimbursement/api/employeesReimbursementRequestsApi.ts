import { EmployeeReimbursementRequests } from "../types/reimbursement";
import { LeaveRequestsProps } from "../../leave/api/employeesLeaveRequests";
import { LeaveStatusFilter } from "../../leave/types/leave";
import { ReimbursementRequestStatus } from "@/app/(protected)/employee/reimbursement/types/reimbursement";
import { mockEmployeesReimbursementRequests } from "../mock-data/requests";
import { API_BASE_URL } from "@/lib/util/api";

const statusFilterMap: Record<Exclude<LeaveStatusFilter, LeaveStatusFilter.ALL>, ReimbursementRequestStatus> = {
    [LeaveStatusFilter.PENDING]: ReimbursementRequestStatus.PENDING,
    [LeaveStatusFilter.APPROVED]: ReimbursementRequestStatus.APPROVED,
    [LeaveStatusFilter.REJECTED]: ReimbursementRequestStatus.REJECTED,
};

export async function employeesReimbursementRequestApi({
  page,
  year,
  month,
  limit,
  filter,
}: LeaveRequestsProps): Promise<EmployeeReimbursementRequests> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    const targetMonth = `${year}-${String(month + 1).padStart(2, "0")}`;
    const monthFiltered = mockEmployeesReimbursementRequests.filter((request) =>
      request.dateSubmitted.startsWith(targetMonth),
    );
    const availableRequests =
      monthFiltered.length > 0
        ? monthFiltered
        : mockEmployeesReimbursementRequests;
    const filtered =
      filter === LeaveStatusFilter.ALL
        ? availableRequests
        : availableRequests.filter(
            (request) => request.status === statusFilterMap[filter],
          );
    const safePage = Math.max(page, 1);
    const safeLimit = Math.max(limit, 1);
    const start = (safePage - 1) * safeLimit;

    return {
      requests: filtered.slice(start, start + safeLimit),
      meta: {
        page: safePage,
        limit: safeLimit,
        total: filtered.length,
      },
    };
  }

    const endpoint = `/admin/employee/reimbursement-requests?year=${year}&month=${month+1}&page=${page}&limit=${limit}&filter=${filter}`
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) throw new Error ("Cannot fetch employees reimbursement requests.");
    
    const result = await response.json();
    console.log("Fetched reimbursement requests: ", result);
    
    return result;   
}