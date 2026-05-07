"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateWithoutYear, formatTableDate, getMonthYear } from "@/lib/util/date-format";
import { formatPeso } from "@/lib/util/currency-format";
import { Calendar } from "lucide-react";
import { useDashboardRequests } from "../hooks/useDashboardRequests";
import { requestIcon, statusStyles, statusText, RequestType, titleFormat  } from "../types/requests";
import { leaveTypeFormatText } from "@/app/(protected)/employee/leave/types/leave";
import { requestTypeFormat } from "@/app/(protected)/employee/reimbursement/types/format";
import { ScrollArea } from "@/components/ui/scroll-area";

function RequestsSkeleton() {
    return Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="rounded-xl border p-4 shadow-sm lg:p-5">
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/5" />
                    <Skeleton className="h-3 w-4/5" />
                </div>

                <Skeleton className="h-6 w-20 rounded-md" />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-16" />
            </div>
        </div>
    ));
}

export default function Requests() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    const {data, isLoading, error} = useDashboardRequests(month, year);
    const requests = data?.requests ?? [];

    return (
        <div className="flex flex-col flex-1">
            <p className="mb-2 text-sm font-light lg:text-base">My Recent Requests</p>

           <Card className="flex h-full flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center justify-start gap-2 text-base lg:text-lg">
                        <Calendar size={18}/>
                        {getMonthYear(today)}
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 overflow-hidden ">
                    <ScrollArea className="h-55 sm:h-60 lg:h-70 px-2">
                        <div className="space-y-3 lg:space-y-4">
                        {isLoading && (
                            <RequestsSkeleton />
                        )}

                        {error && (
                            <div className="text-center py-8 text-red-400 rounded-xl border p-4 shadow-sm lg:p-5">
                                Failed to load requests.
                            </div>
                        )}

                        {!isLoading && !error && requests.length === 0 && (
                            <div className="text-center py-8 rounded-xl border p-4 shadow-sm lg:p-5">
                                No requests yet.
                            </div>
                        )}
                        {requests.map((request) => {
                            const Icon = requestIcon[request.type];

                            return (
                                <div
                                    key={request.id}
                                    className="rounded-xl border p-4 shadow-sm lg:p-5"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="flex items-center gap-2 text-sm font-medium lg:text-base">
                                                {/*<Icon className="h-5 w-5 text-muted-foreground" />*/}
                                                {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
                                                {titleFormat[request.type]}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground lg:text-sm">
                                                {request.type === "LEAVE" && request.leaveType &&
                                                    `${formatDateWithoutYear(request.startDate)} - ${formatDateWithoutYear(request.endDate)} (${leaveTypeFormatText[request?.leaveType]})`
                                                }

                                                {request.type === "REIMBURSEMENT" && request.reimbursementType && 
                                                    `Type: ${requestTypeFormat[request.reimbursementType]}`
                                                }
                                            </p>
                                        </div>

                                        <span className={`rounded-md px-2.5 py-1 text-xs font-medium lg:text-sm ${statusStyles[request.status]}`}>
                                            {statusText[request.status]}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground lg:text-sm">
                                        <span>Submitted {formatTableDate(request.submittedAt)}</span>
                                        {request.amount !== undefined && (
                                            <span className="font-medium text-foreground">{formatPeso(request.amount)}</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card> 
        </div>
    );
}