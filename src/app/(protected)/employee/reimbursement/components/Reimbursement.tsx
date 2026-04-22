"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useReimbursementSummary } from "../hooks/useReimbursementSummary";
import ReimbursementCard from "./ReimbursementCard";
import { useReimbursementRequests } from "../hooks/useReimbursementRequests";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { formatTableDate } from "@/lib/util/date-format";
import { ReimbursementType } from "../types/reimbursement";
import { formatPeso } from "@/lib/util/currency-format";
import { reimbursementStatusStyle, formatReimbursementStatusText } from "../types/format";
import ReimbursementDialog from "./ReimbursementDialog";
import { useState } from "react";

export default function Reimbursement() {
    const [open, setOpen] = useState(false);
    const {data: summary } = useReimbursementSummary();
    const {data, isLoading, error } = useReimbursementRequests();

    const requests = data?.requests ?? [];
    const formatText = (type: ReimbursementType) => {
        const format = type === ReimbursementType.FOOD 
        ? "Food" 
        : ReimbursementType.OTHER
        ? "Other" : "Transportation"

        return format;
    }

    return (
        <>
        <div className="space-y-6">
            <ReimbursementCard data={summary}/>
            {/* Reimbursement Requests Section */}
            <Card className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Reimbursement Requests</h2>
                    <Button onClick={() => setOpen(true)}>
                        <Plus/>
                        Request Reimbursement
                    </Button>
                </div>
                
                <div className="overflow-x-auto border rounded-md">
                    <Table>
                        <TableHeader className="bg-[#FFEB94]/40">
                            <TableRow>
                                <TableHead>Date Submitted</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
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
                                    <TableCell colSpan={5} className="text-center py-8 text-red-400">
                                        Failed to load accounts.
                                    </TableCell>
                                </TableRow>
                            )}

                            {!isLoading && !error && requests?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center ">
                                        No attendance records found.
                                    </TableCell>
                                </TableRow>
                            )}

                            {!isLoading && !error && requests.length > 0 && requests.map((request) => 
                                <TableRow key={request.id}>
                                    <TableCell>
                                        {formatTableDate(request.dateSubmitted)}
                                    </TableCell>

                                    <TableCell>
                                        {formatText(request.type)}
                                    </TableCell>

                                   <TableCell>
                                        {formatPeso(request.amountRequested)}
                                   </TableCell>

                                   <TableCell>
                                        {formatPeso(request.amountApproved)}
                                   </TableCell>

                                    <TableCell>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-md ${reimbursementStatusStyle[request.status]}`}>
                                            {formatReimbursementStatusText[request.status]}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>

        <ReimbursementDialog open={open} setOpen={setOpen}/>
        </>
    )
}