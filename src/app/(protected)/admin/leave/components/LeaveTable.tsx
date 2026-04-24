"use client"

import { PaginationSimple } from "@/components/shared/Pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { LeaveRequestsResponse } from "../types/leave";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { formatTableDate, formatDateWithoutYear } from "@/lib/util/date-format";
import { fullName } from "@/lib/util/name-format";
import { leaveTypeFormatText } from "@/app/(protected)/employee/leave/types/leave";
import LeaveActions from "./LeaveActions";
import { leaveRequestStatusStyle, formatLeaveRequestText } from "../types/leave-status";

type Props = {
    data?: LeaveRequestsResponse
    isLoading?: boolean;
    error?: Error | null
    page: number
    setPage: (page: number)=> void
    searchTerm?: string
}
export default function LeaveTable({data, isLoading, error, page, setPage, searchTerm= ""}: Props) {

    const requests = data?.requests ?? [];
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredRequests = requests.filter((request) => {
        if (!normalizedSearch) return true;

        const fullName = `${request.firstname} ${request.lastname}`.toLowerCase();
        const employeeId = request.employeeId.toLowerCase();

        return (
            fullName.includes(normalizedSearch) ||
            employeeId.includes(normalizedSearch)
        );
    });

    return (
        <>
        <div className="flex flex-col space-y4">
            
            <div className="flex-1 overflow-x-auto border rounded-md">
                <Table>
                    <TableHeader className="bg-[#FFEB94]/40">
                        <TableRow>
                            <TableHead>Date Submitted</TableHead>
                            <TableHead>Employee</TableHead>
                            <TableHead>Leave Type</TableHead>
                            <TableHead>Leave Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                            
                    <TableBody>
                        {isLoading && (
                            <AttendanceLogsSkeletonRows />
                        )}
                        
                        {error && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-red-400">
                                    Failed to load accounts.
                                </TableCell>
                            </TableRow>
                        )}
                        
                        {!isLoading && !error && filteredRequests.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center ">
                                    {normalizedSearch ? "No results found" : "No leave records yet."}
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && !error && filteredRequests.length > 0 && 
                            filteredRequests.map((req)=> (
                                <TableRow key={req.id}>
                                    <TableCell>
                                        {formatTableDate(req.dateSubmitted)}
                                    </TableCell>

                                    <TableCell>
                                        {fullName(req.firstname, req.lastname)}
                                    </TableCell>

                                    <TableCell>
                                        {leaveTypeFormatText[req.leaveType]}
                                    </TableCell>
                                    
                                    <TableCell>
                                        {`${formatDateWithoutYear(req.startDate)} - ${formatDateWithoutYear(req.endDate)}`}
                                    </TableCell>

                                    <TableCell>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-md ${leaveRequestStatusStyle[req.status]}`}>
                                           {formatLeaveRequestText[req.status]}
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        <LeaveActions leaveRequest={req}/>
                                    </TableCell>
                                </TableRow>
                            ))
                        }    
                    </TableBody>
                </Table> 
            </div>

            </div>
            <PaginationSimple 
                page={page} 
                total={data?.meta.total ?? 0}
                limit={data?.meta.limit ?? 5}
                onPageChange={setPage}
            />
        </>
    ); 
}