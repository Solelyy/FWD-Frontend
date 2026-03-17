import { 
    Dialog, 
    DialogContent, 
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import React from "react";
import { AccountInfo } from "../types/account";
import { ActionProps } from "../types/actions";
import { Button } from "@/components/ui/button";

type ActionDialogProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    account: AccountInfo
    action: ActionProps | null
    onConfirm?: (account: AccountInfo, action:ActionProps) => void
    onCancel? : () => void
    isPending: boolean
}

export default function ActionDialog({
    open, setOpen, account, action, onConfirm, onCancel, isPending
} : ActionDialogProps) {
    if (!action) return null;

    const handleConfirm = async () => {
        await onConfirm?.(account, action)
        setOpen(false)
    }

    const handleCancel = () => {
        onCancel?.()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {action.confirmTitle}
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    {action.confirmMessage}
                </DialogDescription>
                
                <DialogFooter className="flex flex-col-reverse gap-2">
                        <Button className="order-1" onClick={handleConfirm} disabled={isPending}>
                            {action.confirmActionMessage}
                        </Button>

                        <Button variant="ghost" onClick={handleCancel}>
                            Cancel
                        </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}