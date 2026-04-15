import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EmployeeAttendance } from "../types/attendance-types";
import { ActionPropsAttendance } from "../types/actions";
import { Button } from "@/components/ui/button";

type ActionDialogProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    attendanceLog: EmployeeAttendance
    action: ActionPropsAttendance | null;
    onConfirm?: (
        attendanceLog: EmployeeAttendance,
        action: ActionPropsAttendance
        //extra?: {}
    ) => void
    onCancel?: ()=> void
    isPending: boolean
}

export default function AttendanceActionDialog({
    open, setOpen, attendanceLog, action, onConfirm, onCancel, isPending}: ActionDialogProps) {
    
    if (!action) return null;

    const handleCancel = () => {
        onCancel?.()
        setOpen(false)
    }

    const handleConfirm = () => {
        setOpen(false);
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