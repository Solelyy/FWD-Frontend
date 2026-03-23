import { 
    Dialog, 
    DialogContent, 
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import React, { useState } from "react";
import { AccountInfo, Status } from "../types/account";
import { ActionEnum, ActionProps } from "../types/actions";
import { Button } from "@/components/ui/button";
import { SuspendAccountDialog } from "./SuspendAccountDialog";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

type ActionDialogProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    account: AccountInfo
    action: ActionProps | null
    onConfirm?: (
        account: AccountInfo, 
        action:ActionProps,
        extra?: { startDate: string, endDate: string }
    ) => void
    onCancel? : () => void
    isPending: boolean
}

export default function ActionDialog({
    open, setOpen, account, action, onConfirm, onCancel, isPending
} : ActionDialogProps) {
    if (!action) return null;

    const handleConfirm = async () => {
        if (action.targetAction === ActionEnum.SUSPEND) {
            if (!dateRange?.from|| !dateRange.to) {
                toast.error("Please select a date");
                return;
            }
            await onConfirm?.(account, action, {
                startDate: dateRange.from.toISOString(),
                endDate: dateRange.to.toISOString(),
            });
        } else {
            await onConfirm?.(account, action)
        }
        setOpen(false)
    }

    const handleCancel = () => {
        onCancel?.()
        setOpen(false)
    }

    //suspend an account
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {action.confirmTitle}
                    </DialogTitle>
                </DialogHeader>

                {action.targetAction == ActionEnum.SUSPEND && (
                    <>
                    <DialogDescription>
                        Please select the start and end date of suspension of this account
                    </DialogDescription>
                    <SuspendAccountDialog date={dateRange} setDate={setDateRange}/>
                    </>
                )}

                {action.targetAction != ActionEnum.SUSPEND && (
                    <DialogDescription>
                        {action.confirmMessage}
                    </DialogDescription>
                )}
                
                <DialogFooter className="flex flex-col-reverse gap-2">
                        <Button className="order-1" onClick={handleConfirm} disabled={isPending}>
                            {isPending ? action.pendingLabel : action.confirmActionMessage }
                        </Button>

                        <Button variant="ghost" onClick={handleCancel}>
                            Cancel
                        </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}