"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LeaveActionProps, LeaveActionType } from "../types/leave-actions";
import { EmployeeLeaveRequest } from "../types/leave";
import { UpdateLeaveStatusPayload } from "../api/updateLeaveStatusApi";
import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: LeaveActionProps | null;
  leaveRequest: EmployeeLeaveRequest;
  onConfirm: ({
    id,
    leaveAction,
    adminReason,
  }: UpdateLeaveStatusPayload) => void;
  onCancel?: () => void;
  isPending: boolean;
};

export default function LeaveActionDialog({
  open,
  setOpen,
  action,
  leaveRequest,
  onConfirm,
  onCancel,
  isPending,
}: Props) {
  if (!action) return null;

  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  const handleConfirm = () => {
    /*
    const trimmedReason = reason.trim();
    
    if (trimmedReason) {
      setReasonError("Please provide a reason for this action.");
      return;
    }*/

    if (action.targetAction === LeaveActionType.REJECT) {
      const trimmedReason = reason.trim();

      if (!trimmedReason) {
        setReasonError("Please provide a reason for this action.");
        return;
      }
    }

    setReasonError("");

    onConfirm({
      id: leaveRequest.id,
      leaveAction: action.targetAction,
      adminReason: reason,
    });
    setOpen(false);
  };

  const Icon = action.icon;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5" />}
            {action.confirmTitle}
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>{action.confirmMessage}</DialogDescription>

        {action.targetAction === LeaveActionType.REJECT && (
          <div className="space-y-2">
            <Label htmlFor="reason">Reason (Required)</Label>
            <textarea
              id="reason"
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
                if (reasonError) {
                  setReasonError("");
                }
              }}
              placeholder="Please tell the reason for disapproval."
              className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px]"
              rows={4}
              required
            />
            {reasonError && (
              <p className="text-sm font-medium text-destructive">
                {reasonError}
              </p>
            )}
          </div>
        )}

        <DialogFooter className="flex flex-col-reverse gap-2">
          <Button
            className="order-1"
            variant={
              action.variant === "destructive" ? "destructive" : "default"
            }
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? action.pendingLabel : action.confirmActionMessage}
          </Button>

          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
