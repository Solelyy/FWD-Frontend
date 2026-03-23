"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import type { ActionProps } from "@/features/account-management/types/actions";
import {
  ActionEnum,
  getActionsByStatus,
} from "@/features/account-management/types/actions";
import { useState } from "react";
import ActionDialog from "./ActionDialog";
import { AccountInfo } from "../types/account";
import { useAccountActions } from "../hooks/useAccountActions";
import { Status } from "../types/account";

export function Actions({ account }: { account: AccountInfo }) {
  const actions = getActionsByStatus(account.status);
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ActionProps | null>(
    null,
  );

  function handleAction(action: ActionProps) {
    setSelectedAction(action);
    setOpen(true);
    console.log(action.targetAction, account);
  }

  const { updateStatus, suspendAccount, removeAccount, resendInvite } =
    useAccountActions();

  const isPending =
    updateStatus.isPending ||
    suspendAccount.isPending ||
    removeAccount.isPending ||
    resendInvite.isPending;

  const handleConfirm = async (
    account: AccountInfo,
    action: ActionProps,
    extra?: { startDate: string; endDate: string },
  ) => {
    if (isPending) return;
    const actionHandlers = {
      [ActionEnum.ACTIVATE]: () =>
        updateStatus.mutateAsync({
          employeeId: account.employeeId,
          status: Status.ACTIVE,
          role: account.role,
        }),

      [ActionEnum.INACTIVATE]: () =>
        updateStatus.mutateAsync({
          employeeId: account.employeeId,
          status: Status.INACTIVE,
          role: account.role,
        }),

      [ActionEnum.RESEND]: () =>
        resendInvite.mutateAsync({ 
          email: account.email, 
          role: account.role }),

      [ActionEnum.SUSPEND]: () =>
        suspendAccount.mutateAsync({
          employeeId: account.employeeId,
          status: Status.SUSPENDED,
          role: account.role,
          startDate: extra!.startDate,
          endDate: extra!.endDate,
        }),

      [ActionEnum.REMOVE]: () =>
        removeAccount.mutateAsync({ 
          employeeId: account.employeeId, 
          role: account.role }),
    };

    await actionHandlers[action.targetAction]?.();
    setOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontalIcon />
            <span className="sr-only">Open Menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {actions.map((action, idx) => (
            <div key={action.targetAction}>
              <DropdownMenuItem
                className={
                  action.variant === "destructive" ? "text-red-500" : ""
                }
                onClick={() => handleAction(action)}
              >
                {action.label}
              </DropdownMenuItem>
              {idx !== actions.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <ActionDialog
        open={open}
        setOpen={setOpen}
        account={account}
        action={selectedAction}
        onConfirm={handleConfirm}
        isPending={isPending}
      />
    </>
  );
}
