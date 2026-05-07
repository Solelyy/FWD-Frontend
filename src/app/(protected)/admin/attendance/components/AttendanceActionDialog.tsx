import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EmployeeAttendance } from "../types/attendance-types";
import { ActionPropsAttendance, AttendanceActions } from "../types/actions";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import AddAttendance from "./AddAttendance";
import { Label } from "@/components/ui/label";


type ActionDialogProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    attendanceLog: EmployeeAttendance
    action: ActionPropsAttendance | null;
    onConfirm?: (
        attendanceLog: EmployeeAttendance,
        action: ActionPropsAttendance,
        reason: string,
        extra?: { timeIn?: Date; timeOut?: Date }
    ) => void
    onCancel?: ()=> void
    isPending: boolean
}

export default function AttendanceActionDialog({
    open, setOpen, attendanceLog, action, onConfirm, onCancel, isPending}: ActionDialogProps) {
    const [attendanceTimes, setAttendanceTimes] = useState<{ timeIn?: Date; timeOut?: Date }>({});
    const [reason, setReason] = useState("");
    const [reasonError, setReasonError] = useState("");

    const shouldShowAddAttendance =
        action?.targetAction === AttendanceActions.ADD_ATTENDANCE ||
        action?.targetAction === AttendanceActions.OVERRIDE_ATTENDANCE;

    const initialTimeIn = useMemo(() => {
        if (action?.targetAction !== AttendanceActions.OVERRIDE_ATTENDANCE) return undefined;
        const parsed = new Date(attendanceLog.timeIn?.timestamp);
        return Number.isNaN(parsed.getTime()) ? undefined : parsed;
    }, [action?.targetAction, attendanceLog.timeIn?.timestamp]);

    const initialTimeOut = useMemo(() => {
        /*
        if (action?.targetAction !== AttendanceActions.OVERRIDE_ATTENDANCE) return undefined;
        const parsed = new Date(attendanceLog.timeOut?.timestamp);
        return Number.isNaN(parsed.getTime()) ? undefined : parsed;
        */
        if (action?.targetAction !== AttendanceActions.OVERRIDE_ATTENDANCE) {
            return undefined;
        }

        const parsed = new Date(attendanceLog.timeOut?.timestamp);

        if (Number.isNaN(parsed.getTime())) {
            return undefined;
        }

        // Temporary fix for corrupted backend dates
        if (parsed.getFullYear() === 1970) {
            const today = new Date();

            parsed.setFullYear(today.getFullYear());
            parsed.setMonth(today.getMonth());
            parsed.setDate(today.getDate());
        }
        return parsed;

    }, [action?.targetAction, attendanceLog.timeOut?.timestamp]);

    if (!action) return null;

    const handleCancel = () => {
        onCancel?.()
        setOpen(false)
    }

    const handleConfirm = () => {
        const trimmedReason = reason.trim();

        if (!trimmedReason) {
            setReasonError("Please provide a reason for this action.");
            return;
        }

        setReasonError("");

        onConfirm?.(attendanceLog, action, trimmedReason, attendanceTimes);
    }
    
    const Icon = action.icon;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {Icon && <Icon size={20} />}
                        {action.confirmTitle}
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    {action.confirmMessage}
                </DialogDescription>

                {shouldShowAddAttendance && (
                    <AddAttendance
                        initialTimeIn={initialTimeIn}
                        initialTimeOut={initialTimeOut}
                        onTimesChange={setAttendanceTimes}
                    />
                )}

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
                        placeholder="Please provide a reason for this action"
                        className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px]"
                        rows={4}
                    />

                    {reasonError && (
                        <p className="text-sm font-medium text-destructive">
                            {reasonError}
                        </p>
                    )}
                </div>
                
                <DialogFooter className="flex flex-col-reverse gap-2">
                    <Button 
                        className="order-1" 
                        onClick={handleConfirm} 
                        disabled={isPending} 
                        variant={action.variant === "destructive" ? "destructive" : "default"}
                    >
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