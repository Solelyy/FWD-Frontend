"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { toast } from "sonner";
import { useReimbursementMutation } from "../hooks/useReimbursementMutation";
import { ReimbursementType } from "../types/reimbursement";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ReimbursementDialog({open, setOpen}: Props) {
    const [amountRequested, setAmountRequested] = useState("");
    const [reason, setReason] = useState("");
    const [attachment, setAttachment] = useState("");
    const [type, setType] = useState<ReimbursementType | null>(null);

    const handleSubmit = () => {

    }

    const handleCancel = () => {
        setOpen(false);
    };
    
    const {mutateAsync, isPending} = useReimbursementMutation();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Reimbursement Request</DialogTitle>
                        <DialogDescription>
                            Please fill in the needed information for your request.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit}>
                        
                    </form>

                    <DialogFooter className="flex flex-col-reverse gap-2 md:flex-row md:justify-end">
                        <Button type="button" className="w-full md:w-auto" variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                        
                        <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
                            {isPending ? "Submitting..." : "Submit Cash Advance Request"}
                        </Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}