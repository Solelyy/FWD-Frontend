import { LeaveType } from "@/app/(protected)/employee/leave/types/leave";
import { LeaveStatusFilter, LeaveRequestsResponse, LeaveRequestStatus } from "../types/leave";

export type LeaveRequestsProps= {
    page: number ;
    limit: number;
    year: number;
    month: number;
    filter: LeaveStatusFilter
}

const mockRequests: LeaveRequestsResponse["requests"] = [
    {
        id: 1,
        dateSubmitted: "2026-04-10T09:15:00.000Z",
        employeeId: "EMP-1001",
        firstName: "Mia",
        lastName: "Santos",
        leaveType: LeaveType.VACATION,
        startDate: "2026-04-22",
        endDate: "2026-04-24",
        status: LeaveRequestStatus.PENDING,
    },
    {
        id: 2,
        dateSubmitted: "2026-04-08T13:40:00.000Z",
        employeeId: "EMP-1002",
        firstName: "Noah",
        lastName: "Rivera",
        leaveType: LeaveType.SICK,
        startDate: "2026-04-15",
        endDate: "2026-04-16",
        status: LeaveRequestStatus.REJECTED,
    },
];

const statusFilterMap: Record<Exclude<LeaveStatusFilter, LeaveStatusFilter.ALL>, LeaveRequestStatus> = {
    [LeaveStatusFilter.PENDING]: LeaveRequestStatus.PENDING,
    [LeaveStatusFilter.APPROVED]: LeaveRequestStatus.APPROVED,
    [LeaveStatusFilter.REJECTED]: LeaveRequestStatus.REJECTED,
};

export async function employeesLeaveRequestsApi({page, limit, year, month, filter}: LeaveRequestsProps): Promise<LeaveRequestsResponse> {
    const targetYear = String(year);
    const targetMonth = String(month + 1).padStart(2, "0");

    const monthFiltered = mockRequests.filter((request) => {
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
};




{/* 
export async function employeesLeaveRequestsApi({page, limit, year, month, filter}: LeaveRequestsProps): Promise<LeaveRequestsResponse> {
    const endpoint =  `/employees-attendance?page=${page}&limit=${limit}&year=${year}&month=${month+1}&filter=${filter}`;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
        });
    
    if (!response.ok) throw new Error ("Cannot fetch employees leave requests.");
    
    const result = await response.json();
    console.log("Fetched leave requests: ", result);
    
    return result;   
};*/}