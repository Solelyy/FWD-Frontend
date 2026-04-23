import { EmployeeReimbursementRequests } from "../types/reimbursement";
import { LeaveRequestsProps } from "../../leave/api/employeesLeaveRequests";
import { LeaveStatusFilter } from "../../leave/types/leave";
import {
    ReimbursementRequestStatus,
    ReimbursementType,
} from "@/app/(protected)/employee/reimbursement/types/reimbursement";

const mockEmployeesReimbursementRequests: EmployeeReimbursementRequests["requests"] = [
    {
        id: 1,
        employeeId: "EMP-1001",
        firstname: "John",
        lastname: "Dela Cruz",
        dateSubmitted: "2026-04-11T09:00:00.000Z",
        type: ReimbursementType.FOOD,
        amountRequested: 1200,
        amountApproved: 0,
        reason: "Client lunch meeting",
        attachment: "receipt-food-1001.jpg",
        status: ReimbursementRequestStatus.PENDING,
    },
    {
        id: 2,
        employeeId: "EMP-1002",
        firstname: "Maria",
        lastname: "Santos",
        dateSubmitted: "2026-04-09T14:20:00.000Z",
        type: ReimbursementType.TRANSPORTATION,
        amountRequested: 950,
        amountApproved: 950,
        reason: "Ride-hailing for site visit",
        attachment: "receipt-transport-1002.jpg",
        status: ReimbursementRequestStatus.APPROVED,
    },
    {
        id: 3,
        employeeId: "EMP-1003",
        firstname: "Paolo",
        lastname: "Reyes",
        dateSubmitted: "2026-04-07T11:45:00.000Z",
        type: ReimbursementType.OTHER,
        amountRequested: 2500,
        amountApproved: 0,
        reason: "Misc office supplies",
        attachment: "receipt-other-1003.jpg",
        status: ReimbursementRequestStatus.REJECTED,
    },
];

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