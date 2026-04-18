"use client";

import { DropdownMenu, DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, } from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { EmployeeLeaveRequest } from "../types/leave";
import { getActionsByStatus, LeaveActionProps } from "../types/leave-actions";
import { useLeaveActions } from "../hooks/useLeaveActions";
import LeaveActionDialog from "./LeaveActionDialog";

type Props = {
  leaveRequest: EmployeeLeaveRequest;
};

export default function LeaveActions({ leaveRequest }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<LeaveActionProps | null>(null);

  const { mutate, isPending } = useLeaveActions();

  const leaveActions = getActionsByStatus(leaveRequest.status);

  const handleAction = (action: LeaveActionProps) => {
    setSelectedAction(action);
    setOpen(true);
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
          {leaveActions.map((action, idx) => {
            const Icon = action.icon;

            return (
              <div key={action.targetAction}>
                <DropdownMenuItem
                  onClick={() => handleAction(action)}
                  className={
                    action.variant === "destructive"
                      ? "text-red-500 focus:text-red-500 focus:bg-red-100 dark:focus:bg-red-200"
                      : ""
                  }
                >
                  <div className="flex items-center gap-2">
                    {Icon && (
                      <Icon
                        className={`w-4 h-4 ${
                          action.variant === "destructive"
                            ? "text-red-500"
                            : ""
                        }`}
                      />
                    )}
                    <span>{action.label}</span>
                  </div>
                </DropdownMenuItem>

                {idx !== leaveActions.length - 1 && (
                  <DropdownMenuSeparator />
                )}
              </div>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <LeaveActionDialog
        open={open}
        setOpen={setOpen}
        action={selectedAction}
        leaveRequest={leaveRequest}
        isPending={isPending}
        onConfirm={mutate}
      />
    </>
  );
}