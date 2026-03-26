import type { AccountInfo } from "./account";
import { CheckCircle, Trash2, Mail, PauseCircle, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export enum ActionEnum {
  ACTIVATE = "ACTIVATE",
  INACTIVATE = "INACTIVATE",
  SUSPEND = "SUSPEND",
  REMOVE = "REMOVE",
  RESEND = "RESEND"
}

export type ActionProps = {
  label: string;
  pendingLabel: string
  variant?: "destructive";      // for destructive styling
  targetAction: ActionEnum;
  confirmTitle: string
  confirmMessage: string
  confirmActionMessage: string
  onClick?: (user: AccountInfo) => void;
  icon?: LucideIcon;
};

export const actionConfig: Record<ActionEnum, ActionProps> = {
  [ActionEnum.ACTIVATE] : {
    label: "Activate",
    pendingLabel: "Activating...",
    targetAction: ActionEnum.ACTIVATE,
    confirmTitle: "Confirm Activation",
    confirmMessage: "Are you sure you want to activate this account?",
    confirmActionMessage: "Activate Account",
    icon: CheckCircle,
  },

  [ActionEnum.INACTIVATE] : {
    label: "Inactivate",
    pendingLabel: "Inactivating...",
    targetAction: ActionEnum.INACTIVATE,
    confirmTitle: "Confirm Inactivation",
    confirmMessage: "Are you sure you want to inactivate this account?",
    confirmActionMessage: "Inactivate Account",
    icon: XCircle,
  },

  [ActionEnum.RESEND] : {
    label: "Resend Invitation",
    pendingLabel: "Resending...",
    targetAction: ActionEnum.RESEND,
    confirmTitle: "Confirm Resend Invite",
    confirmMessage: "Are you sure you want to resend the account invitation?",
    confirmActionMessage: "Resend Email",
    icon: Mail
  },

  [ActionEnum.REMOVE] : {
    label: "Remove",
    pendingLabel: "Removing Account...",
    targetAction: ActionEnum.REMOVE,
    confirmTitle: "Confirm Removal",
    confirmMessage: "Are you sure you want to remove this account?",
    variant: "destructive",
    confirmActionMessage: "Remove Account",
    icon: Trash2
  },
  [ActionEnum.SUSPEND]: {
    label: "Suspend",
    pendingLabel: "Suspending...",
    targetAction: ActionEnum.SUSPEND,
    confirmTitle: "Confirm Suspension",
    confirmMessage: "Are you sure you want to suspend this account?",
    confirmActionMessage: "Suspend Account",
    variant: "destructive",
    icon: PauseCircle
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