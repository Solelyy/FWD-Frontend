"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableCell, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useCashAdvanceSummary } from "../hooks/useCashAdvanceSummary";
import CashAdvanceCard from "./CashAdvanceCard";
import { useCashAdvanceRequests } from "../hooks/useCashAdvanceRequests";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { formatTableDate } from "@/lib/util/date-format";
import { formatPeso } from "@/lib/util/currency-format";
import { cashAdvanceStatusStyle, formatCashAdvanceStatusText } from "../types/status-format";
import { useState } from "react";
import CashAdvanceDialog from "./CashAdvanceDialog";

export default function CashAdvance() {
    const [open, setOpen] = useState(false);
    const {data: summary,} = useCashAdvanceSummary();
    const {data: requestsData, isLoading, error} = useCashAdvanceRequests();

    const requests = requestsData?.request ?? [];

    return (
        <>
        <div className="space-y-6">
            <CashAdvanceCard data={summary}/>
            <Card className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Cash Advance Requests</h2>
                    <Button onClick={() => setOpen(true)}>
                        <Plus/>
                        Request Cash Advance
                    </Button>
                </div>
                
                <div className="overflow-x-auto border rounded-md">
                    <Table>
                        <TableHeader className="bg-[#FFEB94]/40">
                            <TableRow>
                                <TableHead>Date Submitted</TableHead>
                                <TableHead>Amount Requested</TableHead>
                                <TableHead>Amount Approved</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading && (
                                <AttendanceLogsSkeletonRows />
                            )}
                            
                            {error && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-red-400">
                                        Failed to load accounts.
                                    </TableCell>
                                </TableRow>
                            )}

                            {!isLoading && !error && requests?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center ">
                                        No attendance records found.
                                    </TableCell>
                                </TableRow>
                            )}

                            {!isLoading && !error && requests.length > 0 && requests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>
                                        {formatTableDate(request.dateSubmitted)}
                                    </TableCell>

                                    <TableCell>
                                        {formatPeso(request.amountRequested)}
                                    </TableCell>

                                    <TableCell>
                                        {formatPeso(request.amountApproved)}
                                    </TableCell>

                                    <TableCell>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-md ${cashAdvanceStatusStyle[request.status]}`}>
                                            {formatCashAdvanceStatusText[request.status]}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
        
        <CashAdvanceDialog open={open} setOpen={setOpen}/>
        </>
    );
}