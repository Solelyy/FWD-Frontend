"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import { toast } from "sonner";
import { useReimbursementMutation } from "../hooks/useReimbursementMutation";
import { ReimbursementType } from "../types/reimbursement";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ReimbursementDialog({open, setOpen}: Props) {
    const [amountRequested, setAmountRequested] = React.useState("");
    const [reason, setReason] = React.useState("");
    const [attachment, setAttachment] = React.useState<File | null>(null);
    const [type, setType] = React.useState<ReimbursementType | undefined>(undefined);
    const MIN_AMOUNT = 50;
    const MAX_AMOUNT = 10000;

    const parsedAmount = Number(amountRequested);
    const isAmountValid =
        amountRequested.trim().length > 0 &&
        Number.isInteger(parsedAmount) &&
        parsedAmount >= MIN_AMOUNT &&
        parsedAmount <= MAX_AMOUNT;

    const reimbursementTypeOptions: Record<ReimbursementType, string> = {
        [ReimbursementType.FOOD]: "Food",
        [ReimbursementType.TRANSPORTATION]: "Transportation",
        [ReimbursementType.OTHER]: "Other",
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!type) {
            toast.error("Please select a reimbursement type.");
            return;
        }

        if (!isAmountValid) {
            toast.error("Amount should be at least 50 and must not exceed 10,000.");
            return;
        }

        try {
            await mutateAsync({
                type,
                amountRequested: parsedAmount,
                reason: reason.trim() || undefined,
                attachment: attachment?.name,
            });

            toast.success("Reimbursement request submitted successfully.");
            setOpen(false);
        } catch (error) {
            console.error("Failed to submit reimbursement request", error);
            toast.error("Unable to submit reimbursement request. Please try again.");
        }
    }

    const handleCancel = () => {
        setOpen(false);
    };
    
    const {mutateAsync, isPending} = useReimbursementMutation();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg"
                onInteractOutside={(e) => e.preventDefault()}
                onKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>Reimbursement Request</DialogTitle>
                        <DialogDescription>
                            Please fill in the needed information for your request.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="reimbursement-type">Reimbursement Type</Label>
                            <Select value={type} onValueChange={(value) => setType(value as ReimbursementType)} required>
                                <SelectTrigger id="reimbursement-type" className="w-full">
                                    <SelectValue placeholder="Select reimbursement type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(ReimbursementType).map((reimbursementType) => (
                                        <SelectItem key={reimbursementType} value={reimbursementType}>
                                            {reimbursementTypeOptions[reimbursementType]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="attachment">Attachment (Optional)</Label>
                            <Input
                                id="attachment"
                                type="file"
                                onChange={(event) => setAttachment(event.target.files?.[0] ?? null)}
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            />
                            {attachment ? (
                                <p className="text-muted-foreground text-xs">Selected: {attachment.name}</p>
                            ) : null}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount-requested">Amount</Label>
                            <div className="relative">
                                <span className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                                    ₱
                                </span>
                                <Input
                                    id="amount-requested"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={amountRequested}
                                    onChange={(event) => {
                                        const digitsOnly = event.target.value.replace(/\D/g, "");

                                        if (!digitsOnly) {
                                            setAmountRequested("");
                                            return;
                                        }

                                        const nextAmount = Number(digitsOnly);
                                        if (nextAmount <= MAX_AMOUNT) {
                                            setAmountRequested(digitsOnly);
                                        }
                                    }}
                                    placeholder="Enter requested amount (min 100, max 10,000)"
                                    className="pl-8"
                                    required
                                />
                            </div>
                            <p className="text-muted-foreground text-xs">Allowed range is ₱50 to ₱10,000.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="reason">Reason (Optional)</Label>
                            <textarea
                                id="reason"
                                value={reason}
                                onChange={(event) => setReason(event.target.value)}
                                placeholder="Add context for your reimbursement request"
                                className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px]"
                                rows={4}
                            />
                        </div>

                        <DialogFooter className="flex flex-col-reverse gap-2 md:flex-row md:justify-end">
                            <Button type="button" className="w-full md:w-auto" variant="secondary" onClick={handleCancel}>
                                Cancel
                            </Button>

                            <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
                                {isPending ? "Submitting..." : "Submit Reimbursement Request"}
                            </Button>
                        </DialogFooter>
                    </form>
            </DialogContent>
        </Dialog>
    )
}