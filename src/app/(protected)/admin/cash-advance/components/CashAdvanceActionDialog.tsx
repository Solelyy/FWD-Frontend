"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CashAdvanceActionProps } from "../types/ca-actions";
import { EmployeeCARequest } from "../types/cash-advance";
import { UpdateCashAdvancePayload } from "../api/updateCashAdvanceApi";
import { CashAdvanceActionType } from "../types/ca-actions";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: CashAdvanceActionProps | null;
  request: EmployeeCARequest;
  onConfirm: ({
    id,
    action,
    approvedAmount,
    adminReason,
  }: UpdateCashAdvancePayload) => void;
  onCancel?: () => void;
  isPending: boolean;
};

export default function CashAdvanceActionDialog({
  open,
  setOpen,
  action,
  request,
  onConfirm,
  onCancel,
  isPending,
}: Props) {
  if (!action) return null;

  const MIN_AMOUNT = 500;
  const requestedAmount = request.requestedAmount;
  const [approvedAmountInput, setApprovedAmountInput] = useState(
    String(requestedAmount),
  );
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");

  useEffect(() => {
    if (action.targetAction === CashAdvanceActionType.APPROVE) {
      setApprovedAmountInput(String(request.requestedAmount));
    }
  }, [action.targetAction, request.requestedAmount, open]);

  const parsedApprovedAmount = Number(approvedAmountInput);
  const isApprovedAmountValid =
    approvedAmountInput.trim().length > 0 &&
    Number.isInteger(parsedApprovedAmount) &&
    parsedApprovedAmount >= MIN_AMOUNT &&
    parsedApprovedAmount <= requestedAmount;

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  const handleConfirm = () => {
    if (
      action.targetAction === CashAdvanceActionType.APPROVE &&
      !isApprovedAmountValid
    ) {
      return;
    }

    const trimmedReason = reason.trim();
    if (!trimmedReason) {
      setReasonError("Please provide a reason for this action.");
      return;
    }

    setReasonError("");

    onConfirm({
      id: request.id,
      action: action.targetAction,
      approvedAmount:
        action.targetAction === CashAdvanceActionType.APPROVE
          ? parsedApprovedAmount
          : request.approvedAmount,
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
            {Icon && <Icon size={20} />}
            {action.confirmTitle}
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>{action.confirmMessage}</DialogDescription>

        {action.targetAction === CashAdvanceActionType.APPROVE && (
          <div className="space-y-2">
            <Label htmlFor="approved-amount">Approved Amount</Label>
            <div className="relative">
              <span className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                ₱
              </span>
              <Input
                id="approved-amount"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={approvedAmountInput}
                onChange={(event) => {
                  const digitsOnly = event.target.value.replace(/\D/g, "");

                  if (!digitsOnly) {
                    setApprovedAmountInput("");
                    return;
                  }

                  setApprovedAmountInput(digitsOnly);
                }}
                placeholder={`Enter approved amount (min ${MIN_AMOUNT}, max ${requestedAmount})`}
                className="pl-8"
                required
              />
            </div>

            {approvedAmountInput.trim().length > 0 &&
            parsedApprovedAmount < MIN_AMOUNT ? (
              <p className="text-destructive text-xs">
                Minimum allowed amount is ₱500.
              </p>
            ) : null}

            {approvedAmountInput.trim().length > 0 &&
            parsedApprovedAmount > requestedAmount ? (
              <p className="text-destructive text-xs">
                Approved amount cannot be greater than requested amount.
              </p>
            ) : null}
          </div>
        )}

        {action.targetAction === CashAdvanceActionType.REJECT && (
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
            disabled={
              isPending ||
              (action.targetAction === CashAdvanceActionType.APPROVE &&
                !isApprovedAmountValid)
            }
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
