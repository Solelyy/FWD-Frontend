"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDateTime } from "@/lib/util/date-format";
import { fullName } from "@/lib/util/name-format";
import { CheckCircle2, XCircle, User, Clock, FileText } from "lucide-react";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    reason?: string;
    attachment?: string;
    isWithAttachment?: boolean;
    actionMade?: boolean;
    status?: "PENDING" | "APPROVED" | "REJECTED";
    actionDetails?: {
        adminFirstname?: string;
        adminLastname?: string;
        rejectionReason?: string;
        timestamp?: string;
    }
}

export default function ViewAdditionalInfo({open, setOpen, reason, attachment, isWithAttachment, actionMade, actionDetails, status}: Props) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[85vh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto p-4 sm:p-6 md:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl">Additional Information</DialogTitle>
                    <DialogDescription>
                        Review the request reason, attachment, and approval history.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 rounded-lg border border-border/70 bg-muted/20 p-4">
                    <p className="text-sm font-medium text-foreground">Reason of the request</p>

                    {!reason && (
                        <span className="text-muted-foreground">No reason provided</span>
                    )}

                    {reason && <p className="whitespace-pre-wrap text-sm text-muted-foreground">{reason}</p>}
                </div>

                {isWithAttachment && (
                    <div className="space-y-3 rounded-lg border border-border/70 p-4">
                        <p className="text-sm font-medium text-foreground">Attachment</p>

                        {attachment ? (
                            <a
                                href={attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                                <FileText size={18} />
                                View Attachment
                            </a>
                        ) : (
                            <span className="text-sm text-muted-foreground">No attachment</span>
                        )}
                    </div>
                )}

                {actionMade && (
                    <div className="space-y-4 rounded-lg border border-border/70 p-4">
                        <p className="text-sm font-medium text-foreground">Request details</p>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-2">
                                    {status === "APPROVED" ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                                            ) : status === "REJECTED" 
                                            ? (
                                                <XCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                            ) : <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400"/>
                                        }
                                    <span className="text-muted-foreground text-sm font-medium">Status</span>
                                </div>
                                <span
                                    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
                                        status === "APPROVED"
                                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300"
                                            : status === "REJECTED"
                                            ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                                            : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300"
                                        }`}
                                    >
                                    {status}
                                </span>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-2">
                                    <User size={20} className="text-muted-foreground" />
                                    <span className="text-muted-foreground text-sm font-medium">Admin</span>
                                </div>
                                <span className="break-words text-left font-base sm:text-right">
                                    {fullName(actionDetails?.adminFirstname ?? "", actionDetails?.adminLastname ?? "")}
                                </span>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-2">
                                    <Clock  size={20} className="text-muted-foreground" />
                                    <span className="text-muted-foreground text-sm font-medium">Timestamp</span>
                                </div>
                                <span className="break-words text-left sm:text-right">
                                    {formatDateTime(actionDetails?.timestamp)}
                                </span>
                            </div>

                            {actionDetails?.rejectionReason && (
                                <div className="space-y-3 border-t pt-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground text-sm font-medium">Reason of Rejection: </span>
                                    </div>
                                    <div className="min-h-10 max-h-30 bg-muted/50 rounded-md p-3 text-sm whitespace-pre-wrap border border-border overflow-auto overflow-x-hidden">
                                        {actionDetails?.rejectionReason?.trim()
                                            ? actionDetails?.rejectionReason
                                            : "No reason provided"
                                        }
                                    </div>
                                </div>  
                            )}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}