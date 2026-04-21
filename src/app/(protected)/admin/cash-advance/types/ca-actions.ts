import { LucideIcon } from "lucide-react";
import { CircleCheckBig, CircleXIcon } from "lucide-react";
import { EmployeeCARequest } from "./cash-advance";

export enum CashAdvanceActionType {
  APPROVE = "APPROVE",
  REJECT= "REJECT"
}

export type CashAdvanceActionProps = {
    label: string;
    pendingLabel: string
    variant?: "destructive";
    targetAction: CashAdvanceActionType;
    confirmTitle: string
    confirmMessage: string
    confirmActionMessage: string
    icon?: LucideIcon;
}

export const cashAdvanceActionConfig: Record<CashAdvanceActionType, CashAdvanceActionProps> = {
    [CashAdvanceActionType.APPROVE]: {
        label: "Approve Cash Advance",
        pendingLabel: "Approving...",
        targetAction: CashAdvanceActionType.APPROVE,
        confirmTitle: "Approve Cash Advance",
        confirmMessage: "Are you sure you want to approve the cash advance request?",
        confirmActionMessage: "Approve Cash Advance",
        icon: CircleCheckBig
    },

    [CashAdvanceActionType.REJECT]: {
        label: "Reject Cash Advance",
        pendingLabel: "Rejecting...",
        variant: "destructive",
        targetAction: CashAdvanceActionType.REJECT,
        confirmTitle: "Reject Cash Advance",
        confirmMessage: "Are you sure you want to reject the cash advance request?",
        confirmActionMessage: "Reject Cash Advance",
        icon: CircleXIcon
    },
}

export const statusActions: Record<EmployeeCARequest["status"], CashAdvanceActionType[]> = {
    PENDING: [
        CashAdvanceActionType.APPROVE,
        CashAdvanceActionType.REJECT
    ],
    REJECTED: [

    ],
    APPROVED: [

    ]
}

export function getActionsByStatus(status: EmployeeCARequest["status"]):CashAdvanceActionProps[] {
    return statusActions[status].map((action) => cashAdvanceActionConfig[action] )
}