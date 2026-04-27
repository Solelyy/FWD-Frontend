import { LeaveStatusFilter, LeaveRequestsResponse, LeaveRequestStatus } from "../types/leave";
import { mockEmployeesLeaveRequests } from "../mock-data/requests";
import { API_BASE_URL } from "@/lib/util/api";

export type LeaveRequestsProps= {
    page: number ;
    limit: number;
    year: number;
    month: number;
    filter: LeaveStatusFilter
}

/*
const statusFilterMap: Record<Exclude<LeaveStatusFilter, LeaveStatusFilter.ALL>, LeaveRequestStatus> = {
    [LeaveStatusFilter.PENDING]: LeaveRequestStatus.PENDING,
    [LeaveStatusFilter.APPROVED]: LeaveRequestStatus.APPROVED,
    [LeaveStatusFilter.REJECTED]: LeaveRequestStatus.REJECTED,
};

export async function employeesLeaveRequestsApi({page, limit, year, month, filter}: LeaveRequestsProps): Promise<LeaveRequestsResponse> {
    const targetYear = String(year);
    const targetMonth = String(month + 1).padStart(2, "0");

    const monthFiltered = mockEmployeesLeaveRequests.filter((request) => {
        return request.startDate.startsWith(`${targetYear}-${targetMonth}`);
    });

    const statusFiltered =
        filter === LeaveStatusFilter.ALL
            ? monthFiltered
            : monthFiltered.filter((request) => request.status === statusFilterMap[filter]);

    const startIndex = (page - 1) * limit;
    const paged = statusFiltered.slice(startIndex, startIndex + limit);

    return {
        requests: paged,
        meta: {
            page,
            limit,
            total: statusFiltered.length,
        },
    };
} */

export async function employeesLeaveRequestsApi({page, limit, year, month, filter}: LeaveRequestsProps): Promise<LeaveRequestsResponse> {
    const endpoint =  `/admin/employee/leave?year=${year}&month=${month+1}&page=${page}&limit=${limit}&filter=${filter}`;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
        });

    if (!response.ok) throw new Error ("Cannot fetch employees leave requests.");

    const result = await response.json();
    console.log("Fetched leave requests: ", result);

    return result;
}