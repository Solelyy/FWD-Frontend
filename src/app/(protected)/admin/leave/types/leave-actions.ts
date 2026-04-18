import { LucideIcon } from "lucide-react";
import { CircleCheckBig, CircleXIcon } from "lucide-react";
import { EmployeeLeaveRequest } from "./leave";

export enum LeaveActionType {
  APPROVE = "APPROVE",
  REJECT= "REJECT"
}

export type LeaveActionProps = {
    label: string;
    pendingLabel: string
    variant?: "destructive";
    targetAction: LeaveActionType;
    confirmTitle: string
    confirmMessage: string
    confirmActionMessage: string
    icon?: LucideIcon;
}

export const leaveActionConfig: Record<LeaveActionType, LeaveActionProps> = {
    [LeaveActionType.APPROVE]: {
        label: "Approve Leave",
        pendingLabel: "Approving...",
        targetAction: LeaveActionType.APPROVE,
        confirmTitle: "Approve Leave",
        confirmMessage: "Are you sure you want to approve the leave request?",
        confirmActionMessage: "Approve Leave",
        icon: CircleCheckBig
    },

    [LeaveActionType.REJECT]: {
        label: "Reject Leave",
        pendingLabel: "Rejecting...",
        variant: "destructive",
        targetAction: LeaveActionType.REJECT,
        confirmTitle: "Reject Leave",
        confirmMessage: "Are you sure you want to reject the leave request?",
        confirmActionMessage: "Reject Leave",
        icon: CircleXIcon
    },
}

export const statusActions: Record<EmployeeLeaveRequest["status"], LeaveActionType[]> = {
    PENDING: [
        LeaveActionType.APPROVE,
        LeaveActionType.REJECT
    ],
    REJECTED: [

    ],
    APPROVED: [

    ]
}

export function getActionsByStatus(status: EmployeeLeaveRequest["status"]):LeaveActionProps[] {
    return statusActions[status].map((action) => leaveActionConfig[action] )
}