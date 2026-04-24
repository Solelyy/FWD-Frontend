import { LeaveType } from "@/app/(protected)/employee/leave/types/leave";
import { AccountInfo } from "@/features/account-management/types/account";

export enum LeaveStatusFilter {
  ALL = "ALL",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

export enum LeaveRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export type EmployeeLeaveRequest = {
  id: number;
  dateSubmitted: string;
  employeeId: AccountInfo["employeeId"];
  firstname: AccountInfo["firstname"];
  lastname: AccountInfo["lastname"];
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveRequestStatus
}

export type LeaveRequestsResponse = {
  requests: EmployeeLeaveRequest[];
  meta: {
    page: number;
    limit: number;
    total: number;
  }
}

export type LeaveStatsResponse = {
  totalRequests: number;
  pending: number;
  approved: number;
  rejected: number;
}