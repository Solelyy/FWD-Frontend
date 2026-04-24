"use client"

import { DropdownMenu, DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, } from "@/components/ui/dropdown-menu";
import { EmployeeCARequest } from "../types/cash-advance";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { CashAdvanceActionProps, getActionsByStatus } from "../types/ca-actions";
import { useCashAdvanceActions } from "../hooks/useCashAdvanceActions";
import CashAdvanceActionDialog from "./CashAdvanceActionDialog";

type Props = {
    request: EmployeeCARequest
}
export default function CashAdvanceActions({request}: Props) {
    const [open, setOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState<CashAdvanceActionProps | null>(null);
    
    const { mutate, isPending } = useCashAdvanceActions();
    const actions = getActionsByStatus(request.status);

    const handleAction = (action: CashAdvanceActionProps) => {
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
          {actions.map((action, idx) => {
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

                {idx !== actions.length - 1 && (
                  <DropdownMenuSeparator />
                )}
              </div>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <CashAdvanceActionDialog
        open={open}
        setOpen={setOpen}
        action={selectedAction}
        request={request}
        isPending={isPending}
        onConfirm={mutate}
      />
        </>
    )
}