import { CircleCheckBig, CircleXIcon } from "lucide-react";
import { EmployeeReimbursementRequest } from "./reimbursement";
import { CashAdvanceActionType, CashAdvanceActionProps } from "../../cash-advance/types/ca-actions";

export const reimbursementActionConfig: Record<CashAdvanceActionType, CashAdvanceActionProps> = {
    [CashAdvanceActionType.APPROVE]: {
        label: "Approve Reimbursement",
        pendingLabel: "Approving...",
        targetAction: CashAdvanceActionType.APPROVE,
        confirmTitle: "Approve Reimbursement",
        confirmMessage: "Are you sure you want to approve the reimbursement request?",
        confirmActionMessage: "Approve Reimbursement",
        icon: CircleCheckBig
    },

    [CashAdvanceActionType.REJECT]: {
        label: "Reject Reimbursement",
        pendingLabel: "Rejecting...",
        variant: "destructive",
        targetAction: CashAdvanceActionType.REJECT,
        confirmTitle: "Reject Reimbursement",
        confirmMessage: "Are you sure you want to reject the reimbursement request?",
        confirmActionMessage: "Reject Reimbursement",
        icon: CircleXIcon
    },
}

export const statusActions: Record<EmployeeReimbursementRequest["status"], CashAdvanceActionType[]> = {
    PENDING: [
        CashAdvanceActionType.APPROVE,
        CashAdvanceActionType.REJECT
    ],
    REJECTED: [

    ],
    APPROVED: [

    ]
}

export function getActionsByStatus(status: EmployeeReimbursementRequest["status"]):CashAdvanceActionProps[] {
    return statusActions[status].map((action) => reimbursementActionConfig[action] )
}