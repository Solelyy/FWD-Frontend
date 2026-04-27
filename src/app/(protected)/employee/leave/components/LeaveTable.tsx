"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableCell, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import LeaveCards from "./LeaveCards";
import { useState } from "react";
import LeaveDialog from "./LeaveDialog";
import { useLeaveRequests } from "../hooks/useLeaveRequests";
import { useLeaveBalances } from "../hooks/useLeaveBalances";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { formatDateWithoutYear, formatTableDate } from "@/lib/util/date-format";
import { overtimeStatusStyle, formatOvertimeText } from "@/app/(protected)/admin/attendance/types/status-format";
import { leaveTypeFormatText } from "../types/leave";

export default function LeaveTable() {
    const [open, setOpen] = useState(false);
    const { data, isLoading, error } = useLeaveRequests();
    const { data: balancesData } = useLeaveBalances();

    const leaveRequests = data?.leaveRequests ?? [];

    return (
        <>
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <LeaveCards data={balancesData} />
            {/* Leave Requests Section */}
            <Card className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Leave Requests</h2>
                    <Button onClick={() => setOpen(true)}>
                        <Plus />
                        Request Leave
                    </Button>
                </div>
                
                <div className="overflow-x-auto border rounded-md">
                    <Table>
                        <TableHeader className="bg-[#FFEB94]/40">
                            <TableRow>
                                <TableHead>Date Submitted</TableHead>
                                <TableHead>Leave Type</TableHead>
                                <TableHead>Leave Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading && (
                                <AttendanceLogsSkeletonRows/>
                            )}

                            {error && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-red-400">
                                        Failed to load accounts.
                                    </TableCell>
                                </TableRow>
                            )}

                            {!isLoading && !error && leaveRequests.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8">
                                        No leave request yet.
                                    </TableCell>
                                </TableRow>
                            )}

                            {!isLoading && !error && leaveRequests?.length > 0 && 
                                leaveRequests?.map((leave) => (
                                    <TableRow key={leave.id}> 
                                        <TableCell>
                                            {formatTableDate(leave.date)}
                                        </TableCell>

                                        <TableCell>
                                            {leaveTypeFormatText[leave.leaveType]}
                                        </TableCell>

                                        <TableCell>
                                            {`${formatDateWithoutYear(leave.startDate)} - ${formatDateWithoutYear(leave.endDate)}`}
                                        </TableCell>

                                        <TableCell>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-md ${overtimeStatusStyle[leave.status]}`}>
                                                {formatOvertimeText[leave.status]}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>

        <LeaveDialog open={open} setOpen={setOpen}/>
        </>
    )
}