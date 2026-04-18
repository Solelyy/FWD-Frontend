import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LeaveActionProps } from "../types/leave-actions";
import { EmployeeLeaveRequest } from "../types/leave";
import { UpdateLeaveStatusPayload } from "../api/updateLeaveStatusApi";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: LeaveActionProps | null;
  leaveRequest: EmployeeLeaveRequest;
  onConfirm: ({employeeId, leaveAction}: UpdateLeaveStatusPayload) => void;
  onCancel?: () => void;
  isPending: boolean;
};

export default function LeaveActionDialog({
  open,
  setOpen,
  action,
  leaveRequest,
  onConfirm,
  onCancel,
  isPending,
}: Props) {
  if (!action) return null;

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm({
      employeeId: leaveRequest.employeeId,
      leaveAction: action.targetAction
    });
    setOpen(false);
  };

  const Icon = action.icon;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5" />}
            {action.confirmTitle}
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          {action.confirmMessage}
        </DialogDescription>

        <DialogFooter className="flex flex-col-reverse gap-2">
          <Button
            variant={action.variant === "destructive" ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={isPending}
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