"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/shared/ui/dropdown-menu";
import { Button } from "@/components/shared/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import type { AccountInfo } from "@/lib/types/account";

type Action = {
  label: string;
  variant?: "destructive";      // for destructive styling
  onClick?: (admin: AccountInfo) => void;
};

// Map each status to allowed actions
const statusActions: Record<AccountInfo["status"], Action[]> = {
  ACTIVE: [
    { label: "INACTIVATE" },
    { label: "SUSPEND" },
    { label: "REMOVE", variant: "destructive"}
  ],
  INACTIVE: [
    { label: "ACTIVATE" },
    { label: "REMOVE", variant: "destructive"}
  ],
  PENDING: [
    { label: "RESEND INVITE" },
    { label: "REMOVE", variant: "destructive"}
  ],
  EXPIRED: [
    { label: "RESEND INVITE" },
    { label: "REMOVE", variant: "destructive"}
  ],
  SUSPENDED: [
    { label: "ACTIVATE" },
    { label: "REMOVE", variant: "destructive" },
  ],
};

interface AdminActionsProps {
  admin: AccountInfo;
}

export function Actions({ admin }: AdminActionsProps) {
  const actions = statusActions[admin.status];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontalIcon />
          <span className="sr-only">Open Menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {actions.map((action, idx) => (
          <div key={action.label}>
            <DropdownMenuItem
              className={action.variant === "destructive" ? "text-red-500" : ""}
              onClick={() => action.onClick?.(admin)}
            >
              {action.label}
            </DropdownMenuItem>
            {/* Add separator except after the last item */}
            {idx === actions.length - 2 ? <DropdownMenuSeparator /> : null}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}