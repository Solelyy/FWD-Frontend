import { EmployeesCARequestsResponse } from "../types/cash-advance";
import { LeaveRequestsProps } from "../../leave/api/employeesLeaveRequests";
import { CashAdvanceRequestStatus } from "@/app/(protected)/employee/cash-advance/types/cash-advance";
import { LeaveStatusFilter } from "../../leave/types/leave";
import { mockEmployeesCARequests } from "../mock-data/ca-requests";

const statusFilterMap: Record<Exclude<LeaveStatusFilter, LeaveStatusFilter.ALL>, CashAdvanceRequestStatus> = {
    [LeaveStatusFilter.PENDING]: CashAdvanceRequestStatus.PENDING,
    [LeaveStatusFilter.APPROVED]: CashAdvanceRequestStatus.APPROVED,
    [LeaveStatusFilter.REJECTED]: CashAdvanceRequestStatus.REJECTED,
};

export async function employeesCARequestsApi({page, limit, year, month, filter}: LeaveRequestsProps): Promise<EmployeesCARequestsResponse>{
    const filtered =
        filter === LeaveStatusFilter.ALL
            ? mockEmployeesCARequests
            : mockEmployeesCARequests.filter((request) => request.status === statusFilterMap[filter]);

    const safePage = Math.max(page, 1);
    const safeLimit = Math.max(limit, 1);
    const start = (safePage - 1) * safeLimit;
    const end = start + safeLimit;

    return {
        requests: filtered.slice(start, end),
        meta: {
            page: safePage,
            limit: safeLimit,
            total: filtered.length
        }
    };
}

/*
export async function employeesCARequestsApi({page, limit, year, month, filter}: LeaveRequestsProps): Promise<EmployeesCARequestsResponse>{
    const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        credentials: "include"
    });

    const result = await response.json();

    if(!response.ok) {
        throw new Error(result.message || "Unable to fetch employees cash advance requests.")
    }
    return result;
}
*/