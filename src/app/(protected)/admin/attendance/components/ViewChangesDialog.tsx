import { AttendanceStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDateTime } from "@/lib/util/date-format";
import { fullName } from "@/lib/util/name-format";
import { CheckCircle2, XCircle, User, Clock, FileText } from "lucide-react";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    reason?: string;
    adminFirstName?: string;
    adminLastName?: string;
    timestamp?: string;
    status?: AttendanceStatus
}

export default function ViewChangesDialog({open, setOpen, reason, adminFirstName, adminLastName, timestamp, status}: Props) {
    const isOverridden = status === AttendanceStatus.COMPLETED;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-sm md:max-w-lg p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl">Attendance Change Details</DialogTitle>
                </DialogHeader>
                
                <DialogDescription className="mb-2">This is the detailed history of the changes.</DialogDescription>
                <div className="space-y-5">
                    {/* Status */}
                    <div className="flex items-center justify-between gap-4 pb-4 border-b">
                        <div className="flex items-center gap-2">
                            {isOverridden ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                            ) : (
                                <XCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            )}
                            <span className="text-muted-foreground text-sm font-medium">Status</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isOverridden 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        }`}>
                            {status === AttendanceStatus.COMPLETED  && "Overridden"}
                            {status === AttendanceStatus.NO_RECORD && "Marked Absent"}
                        </span>
                    </div>

                    {/* Admin */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <User size={20} className="text-muted-foreground" />
                            <span className="text-muted-foreground text-sm font-medium">Admin</span>
                        </div>
                        <span className="font-medium text-right">
                            {fullName(adminFirstName ?? "", adminLastName ?? "")}
                        </span>
                    </div>

                    {/* Timestamp */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Clock  size={20} className="text-muted-foreground" />
                            <span className="text-muted-foreground text-sm font-medium">Changed</span>
                        </div>
                        <span className="font-medium text-right">
                            {formatDateTime(timestamp)}
                        </span>
                    </div>

                    {/* Reason */}
                    <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-2">
                            <FileText size={20} className="text-muted-foreground" />
                            <span className="text-muted-foreground text-sm font-medium">Reason</span>
                        </div>
                        <div className="min-h-10 max-h-30 bg-muted/50 rounded-md p-3 text-sm whitespace-pre-wrap border border-border overflow-auto overflow-x-hidden">
                            {reason?.trim()
                                ? reason
                                : "No reason provided"
                            }
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}