import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EmployeeAttendance } from "../types/attendance-types";
import { ActionPropsAttendance, AttendanceActions } from "../types/actions";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import AddAttendance from "./AddAttendance";

type ActionDialogProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    attendanceLog: EmployeeAttendance
    action: ActionPropsAttendance | null;
    onConfirm?: (
        attendanceLog: EmployeeAttendance,
        action: ActionPropsAttendance,
        extra?: { timeIn?: Date; timeOut?: Date }
    ) => void
    onCancel?: ()=> void
    isPending: boolean
}

export default function AttendanceActionDialog({
    open, setOpen, attendanceLog, action, onConfirm, onCancel, isPending}: ActionDialogProps) {
    const [attendanceTimes, setAttendanceTimes] = useState<{ timeIn?: Date; timeOut?: Date }>({});

    const shouldShowAddAttendance =
        action?.targetAction === AttendanceActions.ADD_ATTENDANCE ||
        action?.targetAction === AttendanceActions.OVERRIDE_ATTENDANCE;

    const initialTimeIn = useMemo(() => {
        if (action?.targetAction !== AttendanceActions.OVERRIDE_ATTENDANCE) return undefined;
        const parsed = new Date(attendanceLog.timein?.timestamp);
        return Number.isNaN(parsed.getTime()) ? undefined : parsed;
    }, [action?.targetAction, attendanceLog.timein?.timestamp]);

    const initialTimeOut = useMemo(() => {
        if (action?.targetAction !== AttendanceActions.OVERRIDE_ATTENDANCE) return undefined;
        const parsed = new Date(attendanceLog.timeout?.timestamp);
        return Number.isNaN(parsed.getTime()) ? undefined : parsed;
    }, [action?.targetAction, attendanceLog.timeout?.timestamp]);

    if (!action) return null;

    const handleCancel = () => {
        onCancel?.()
        setOpen(false)
    }

    const handleConfirm = () => {
        onConfirm?.(attendanceLog, action, attendanceTimes);
        setOpen(false);
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