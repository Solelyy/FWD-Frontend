import { EmployeeReimbursementRequests } from "../types/reimbursement";
import { LeaveRequestsProps } from "../../leave/api/employeesLeaveRequests";
import { LeaveStatusFilter } from "../../leave/types/leave";
import {
    ReimbursementRequestStatus,
} from "@/app/(protected)/employee/reimbursement/types/reimbursement";
import { mockEmployeesReimbursementRequests } from "../mock-data/requests";

const statusFilterMap: Record<Exclude<LeaveStatusFilter, LeaveStatusFilter.ALL>, ReimbursementRequestStatus> = {
    [LeaveStatusFilter.PENDING]: ReimbursementRequestStatus.PENDING,
    [LeaveStatusFilter.APPROVED]: ReimbursementRequestStatus.APPROVED,
    [LeaveStatusFilter.REJECTED]: ReimbursementRequestStatus.REJECTED,
};

export async function employeesReimbursementRequestApi({page, year, month, limit, filter}: LeaveRequestsProps): Promise<EmployeeReimbursementRequests> {
    const filtered =
        filter === LeaveStatusFilter.ALL
            ? mockEmployeesReimbursementRequests
            : mockEmployeesReimbursementRequests.filter((request) => request.status === statusFilterMap[filter]);

    const safePage = Math.max(page, 1);
    const safeLimit = Math.max(limit, 1);
    const start = (safePage - 1) * safeLimit;
    const end = start + safeLimit;

    return {
        requests: filtered.slice(start, end),
        meta: {
            page: safePage,
            limit: safeLimit,
            total: filtered.length,
        },
    };
}

/*
export async function employeesReimbursementRequestApi({page, year, month, limit, filter}: LeaveRequestsProps): Promise<EmployeeReimbursementRequests> {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) throw new Error ("Cannot fetch employees reimbursement requests.");
    
    const result = await response.json();
    console.log("Fetched reimbursement requests: ", result);
    
    return result;   
}
*/