"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CashAdvanceDialog({open, setOpen}: Props) {
    const [amount, setAmount] = React.useState("");
    const [reason, setReason] = React.useState("");
    const MIN_AMOUNT = 500;
    const MAX_AMOUNT = 20000;

    const parsedAmount = Number(amount);
    const isAmountValid =
        amount.trim().length > 0 &&
        Number.isInteger(parsedAmount) &&
        parsedAmount >= MIN_AMOUNT &&
        parsedAmount <= MAX_AMOUNT;

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isAmountValid) return;

        // Keep payload shape stable so API wiring can be added later without form refactor.
        const payload = {
            amountRequested: parsedAmount,
            reason: reason.trim() || undefined,
        };

        console.debug("Cash advance payload (submission not wired yet)", payload);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Cash Advance Request</DialogTitle>
                    <DialogDescription>
                        Please fill in the needed information for your request.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <div className="relative">
                            <span className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                                ₱
                            </span>
                            <Input
                                id="amount"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={amount}
                                onChange={(event) => {
                                    const digitsOnly = event.target.value.replace(/\D/g, "");

                                    if (!digitsOnly) {
                                        setAmount("");
                                        return;
                                    }

                                    const nextAmount = Number(digitsOnly);
                                    if (nextAmount <= MAX_AMOUNT) {
                                        setAmount(digitsOnly);
                                    }
                                }}
                                placeholder="Enter requested amount (min 500, max 20,000)"
                                className="pl-8"
                                required
                            />
                        </div>
                        {amount.trim().length > 0 && parsedAmount < MIN_AMOUNT ? (
                            <p className="text-destructive text-xs">
                                Minimum allowed amount is ₱500.
                            </p>
                        ) : null}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason (Optional)</Label>
                        <textarea
                            id="reason"
                            value={reason}
                            onChange={(event) => setReason(event.target.value)}
                            placeholder="Add context for your request"
                            className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px]"
                            rows={4}
                        />
                    </div>

                    <DialogFooter className="flex flex-col-reverse gap-2 md:flex-row md:justify-end">
                        <Button type="button" className="w-full md:w-auto" variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>

                        <Button type="submit" className="w-full md:w-auto">
                            Submit Cash Advance Request
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}