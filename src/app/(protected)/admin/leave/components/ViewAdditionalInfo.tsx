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
            <DialogContent className="max-w-sm md:max-w-lg space-y-2 p-4 md:p-6 max-h-[70%] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Additional Information</DialogTitle>
                </DialogHeader>

                <div className="border min-h-40 max-h-70 rounded-md text-base overflow-auto text-justify p-2">
                    <DialogDescription className="mb-2">Reason of the request: </DialogDescription>

                    {!reason && (
                        <span className="text-muted-foreground">No reason provided</span>
                    )}

                    {reason}
                </div>

                {isWithAttachment && (
                    <div className="border min-h-20 max-h-70 rounded-md text-base overflow-auto text-justify p-2">
                        <DialogDescription className="mb-2">Attachment: </DialogDescription>

                        {!attachment && (
                            <span className="text-muted-foreground">No attachment provided</span>
                        )}

                        {attachment}
                    </div>
                )}

                {actionMade && (
                    <div className="border min-h-20 rounded-md text-base text-justify p-2">
                        <DialogDescription className="mb-2">Request Details: </DialogDescription>

                        <div className="space-y-5">
                            {/* Status */}
                            <div className="flex items-center justify-between gap-4 pb-4 border-b">
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
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        status === "APPROVED"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                            : status === "REJECTED"
                                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                        }`}
                                    >
                                    {status}
                                </span>
                            </div>

                            {/* Admin */}
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <User size={20} className="text-muted-foreground" />
                                    <span className="text-muted-foreground text-sm font-medium">Admin</span>
                                </div>
                                <span className="font-base text-right">
                                    {fullName(actionDetails?.adminFirstname ?? "", actionDetails?.adminLastname ?? "")}
                                </span>
                            </div>

                            {/* Timestamp */}
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <Clock  size={20} className="text-muted-foreground" />
                                    <span className="text-muted-foreground text-sm font-medium">Timestamp</span>
                                </div>
                                <span className="font-base text-right">
                                    {formatDateTime(actionDetails?.timestamp)}
                                </span>
                            </div>

                            {/* Reason */}
                            {actionDetails?.rejectionReason && (
                                <div className="space-y-4 pt-2">
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