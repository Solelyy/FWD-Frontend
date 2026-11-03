import { AttendanceStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDateTime } from "@/lib/util/date-format";
import { fullName } from "@/lib/util/name-format";
import { CheckCircle2, XCircle, User, Clock, FileText, ArrowRight } from "lucide-react";

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
            <DialogContent className="max-h-[85vh] max-w-sm overflow-y-auto p-0 sm:max-w-lg">
                <DialogHeader className="border-b px-6 pb-5 pt-6">
                    <div className="flex items-start gap-3">
                        <div className="rounded-md border border-primary/20 bg-primary/10 p-2 text-primary">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                            <DialogTitle className="text-xl">Attendance Change Details</DialogTitle>
                            <DialogDescription>
                                Review the recorded attendance change.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 px-6 py-6">
                    <section className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">Change summary</h3>
                        <div className="flex flex-col gap-3 rounded-lg bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                {isOverridden ? (
                                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                ) : (
                                    <XCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                )}
                                <div>
                                    <p className="text-sm font-medium">Attendance status</p>
                                    <p className="text-xs text-muted-foreground">Current result</p>
                                </div>
                            </div>
                            <span className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-xs font-medium ${
                                isOverridden
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300"
                                    : "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-300"
                            }`}>
                                {status === AttendanceStatus.COMPLETED ? "Overridden" : "Marked Absent"}
                            </span>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">Change details</h3>
                        <div className="divide-y rounded-lg border border-border/70">
                            <div className="grid gap-2 p-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span>Admin</span>
                                </div>
                                <span className="break-words text-sm font-medium sm:text-right">
                                    {fullName(adminFirstName ?? "", adminLastName ?? "")}
                                </span>
                            </div>
                            <div className="grid gap-2 p-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>Changed</span>
                                </div>
                                <span className="break-words text-sm font-medium sm:text-right">
                                    {formatDateTime(timestamp)}
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <div className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-primary" />
                            <h3 className="text-sm font-semibold text-foreground">Reason</h3>
                        </div>
                        <div className="max-h-40 overflow-auto rounded-lg bg-muted/30 p-4 text-sm leading-6 whitespace-pre-wrap text-muted-foreground">
                            {reason?.trim() || "No reason provided"}
                        </div>
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    )
}