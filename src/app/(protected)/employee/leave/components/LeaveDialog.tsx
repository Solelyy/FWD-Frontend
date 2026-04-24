"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import { cn } from "@/lib/util/utils";
import { format, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { type DateRange } from "react-day-picker";
import { LeaveType } from "../types/leave";
import { useLeaveMutation } from "../hooks/useLeaveMutation";
import { toast } from "sonner";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LeaveDialog({open, setOpen}: Props) {
    const [leaveType, setLeaveType] = React.useState<LeaveType| undefined>(undefined);
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
    const [reason, setReason] = React.useState("");
    const [attachment, setAttachment] = React.useState<File | null>(null);
    const today = React.useMemo(() => startOfDay(new Date()), []);

    const {mutateAsync, isPending} = useLeaveMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!dateRange?.from || !dateRange?.to || !leaveType) return;

        try {
            await mutateAsync({
                leaveType,
                startDate: dateRange.from.toISOString(),
                endDate: dateRange.to.toISOString(),
                reason,
                attachment: attachment ? attachment.name : undefined, 
            });
            toast.success("Leave Request successfully submitted.")
            setOpen(false);
        } catch (err) {
            console.error("Failed to submit leave request", err);
            toast.error("Unable to submit leave request. Please try again.")
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Leave Request</DialogTitle>
                    <DialogDescription>
                        Please fill in all the required information for your leave request.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="leave-type">Leave Type</Label>
                        <Select value={leaveType} onValueChange={(value) => setLeaveType(value as LeaveType)} required>
                            <SelectTrigger id="leave-type" className="w-full">
                                <SelectValue placeholder="Select leave type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={LeaveType.VACATION}>Vacation Leave</SelectItem>
                                <SelectItem value={LeaveType.SICK}>Sick Leave</SelectItem>
                                <SelectItem value={LeaveType.ACCUMULATED}>Accumulated Leave</SelectItem>
                                <SelectItem value={LeaveType.OTHER}>Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date-range">Date Range</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date-range"
                                    type="button"
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !dateRange?.from && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 size-4" />
                                    {dateRange?.from ? (
                                        dateRange.to ? (
                                            <>
                                                {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(dateRange.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Select leave date range</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="range"
                                    defaultMonth={dateRange?.from}
                                    selected={dateRange}
                                    onSelect={setDateRange}
                                    disabled={{ before: today }}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                        {!dateRange?.from || !dateRange?.to ? (
                            <p className="text-muted-foreground text-xs">Please select a start and end date.</p>
                        ) : null}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason</Label>
                        <textarea
                            id="reason"
                            value={reason}
                            onChange={(event) => setReason(event.target.value)}
                            placeholder="Enter the reason for your leave request"
                            className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px]"
                            rows={4}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="attachment">Attachment (Optional)</Label>
                        <Input
                            id="attachment"
                            type="file"
                            onChange={(event) => setAttachment(event.target.files?.[0] ?? null)}
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        />
                        {attachment && (
                            <p className="text-muted-foreground text-xs">Selected: {attachment.name}</p>
                        )}
                    </div>

                    <DialogFooter className="flex flex-col-reverse gap-2 md:flex-row md:justify-end">
                        <Button type="button" className="w-full md:w-auto" variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="w-full md:w-auto"
                            disabled={isPending}
                        >
                            {isPending ? "Submitting..." : "Submit Leave Request"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}