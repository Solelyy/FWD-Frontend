import type { AccountInfo } from "./account";
import { Status } from "./account";

export enum ActionEnum {
  ACTIVATE = "ACTIVATE",
  INACTIVATE = "INACTIVATE",
  SUSPEND = "SUSPEND",
  REMOVE = "REMOVE",
  RESEND = "RESEND"
}

export type ActionProps = {
  label: string;
  variant?: "destructive";      // for destructive styling
  targetAction: ActionEnum;
  confirmTitle: string
  confirmMessage: string
  confirmActionMessage: string
  onClick?: (user: AccountInfo) => void;
};

export const actionConfig: Record<ActionEnum, ActionProps> = {
  [ActionEnum.ACTIVATE] : {
    label: "Activate",
    targetAction: ActionEnum.ACTIVATE,
    confirmTitle: "Confirm Activation",
    confirmMessage: "Are you sure you want to activate this account?",
    confirmActionMessage: "Activate Account"
  },

  [ActionEnum.INACTIVATE] : {
    label: "Inactivate",
    targetAction: ActionEnum.INACTIVATE,
    confirmTitle: "Confirm Inactivation",
    confirmMessage: "Are you sure you want to inactivate this account?",
    confirmActionMessage: "Inactivate Account"
  },

  [ActionEnum.RESEND] : {
    label: "Resend Invitation",
    targetAction: ActionEnum.RESEND,
    confirmTitle: "Confirm Resend Invite",
    confirmMessage: "Are you sure you want to resend the account invitation?",
    confirmActionMessage: "Resend Email"
  },

  [ActionEnum.REMOVE] : {
    label: "Remove",
    targetAction: ActionEnum.REMOVE,
    confirmTitle: "Confirm Removal",
    confirmMessage: "Are you sure you want to remove?",
    variant: "destructive",
    confirmActionMessage: "Remove Account"
  },
  [ActionEnum.SUSPEND]: {
    label: "Suspend",
    targetAction: ActionEnum.SUSPEND,
    confirmTitle: "Confirm Suspension",
    confirmMessage: "Are you sure you want to suspend this account?",
    confirmActionMessage: "Suspend Account",
    variant: "destructive"
  }
};

export const statusActions: Record <AccountInfo["status"], ActionEnum[]> = {
  ACTIVE: [
    ActionEnum.INACTIVATE,
    ActionEnum.SUSPEND,
    ActionEnum.REMOVE
  ],
  INACTIVE: [
    ActionEnum.ACTIVATE,
    ActionEnum.REMOVE,
  ],
  EXPIRED: [
    ActionEnum.RESEND,
    ActionEnum.REMOVE
  ],
  SUSPENDED: [
    ActionEnum.ACTIVATE,
    ActionEnum.REMOVE
  ],
  PENDING: [
    ActionEnum.REMOVE
  ],
  REMOVED: [
    //nothing
  ]
}

//helper to apply actions per statuses
export function getActionsByStatus(status: AccountInfo["status"]): ActionProps[] {
  return statusActions[status].map((action) => actionConfig[action]);
}

//mapping for backend
export const actionToStatusMap: Partial<Record<ActionEnum, Status>> = {
  [ActionEnum.ACTIVATE]: Status.ACTIVE,
  [ActionEnum.INACTIVATE]: Status.INACTIVE,
  [ActionEnum.SUSPEND]: Status.SUSPENDED,
  [ActionEnum.REMOVE]: Status.REMOVED,
  // RESEND has no status change
};