"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import type { ActionProps } from "@/features/account-management/types/actions"
import { getActionsByStatus } from "@/features/account-management/types/actions";
import { useState } from "react";
import ActionDialog from "./ActionDialog";
import { AccountInfo } from "../types/account";
import { actionToStatusMap } from "@/features/account-management/types/actions";
import { useUpdateAccountStatus } from "../hooks/useAccountMutations";

export function Actions({ account }: {account : AccountInfo}) {
  const actions = getActionsByStatus(account.status)
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ActionProps | null> (null);

  const { mutateAsync: updateStatus, isPending}= useUpdateAccountStatus();

  function handleAction(action: ActionProps){
    setSelectedAction(action);
    setOpen(true);
    console.log(action.targetAction, account);
  }

  //for actions
  const handleConfirm = async (account: AccountInfo, action: ActionProps) => {
    const newStatus = actionToStatusMap[action.targetAction]

    if (!newStatus) return;

    await updateStatus({
      employeeId: account.employeeId,
      newStatus
    })
  }

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
              className={action.variant === "destructive" ? "text-red-500" : ""}
              onClick={() => handleAction(action)}
            >
              {action.label}
            </DropdownMenuItem>
            {idx !== actions.length-1 && <DropdownMenuSeparator />}
            
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

    <ActionDialog open={open} setOpen={setOpen} account={account} action={selectedAction} onConfirm={handleConfirm} isPending={isPending}/>
    </>
  );
}