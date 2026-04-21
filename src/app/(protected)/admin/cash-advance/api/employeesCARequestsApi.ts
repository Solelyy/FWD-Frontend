import { EmployeesCARequestsResponse } from "../types/cash-advance";
import { LeaveRequestsProps } from "../../leave/api/employeesLeaveRequests";
import { CashAdvanceRequestStatus } from "@/app/(protected)/employee/cash-advance/types/cash-advance";
import { LeaveStatusFilter } from "../../leave/types/leave";

const mockEmployeesCARequests: EmployeesCARequestsResponse["requests"] = [
    {
        id: 1,
        employeeId: "EMP-1001",
        firstname: "John",
        lastname: "Dela Cruz",
        dateSubmitted: "2026-04-10T09:15:00.000Z",
        requestedAmount: 5000,
        approvedAmount: 0,
        status: CashAdvanceRequestStatus.PENDING
    },
    {
        id: 2,
        employeeId: "EMP-1002",
        firstname: "Maria",
        lastname: "Santos",
        dateSubmitted: "2026-04-08T13:45:00.000Z",
        requestedAmount: 8000,
        approvedAmount: 8000,
        status: CashAdvanceRequestStatus.APPROVED
    },
    {
        id: 3,
        employeeId: "EMP-1003",
        firstname: "Paolo",
        lastname: "Reyes",
        dateSubmitted: "2026-04-06T11:30:00.000Z",
        requestedAmount: 3000,
        approvedAmount: 0,
        status: CashAdvanceRequestStatus.REJECTED
    }
];

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