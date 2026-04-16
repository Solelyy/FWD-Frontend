import { PaginationSimple } from "@/components/shared/Pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { EmployeeAttendance, EmployeesAttendanceResponse } from "../types/attendance-types";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { formatTime } from "@/lib/util/date-format";
import Actions from "./Actions";
import { ViewDialog } from "@/features/dashboard/components/employee/ViewDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AttendanceStatus, AttendanceType, OvertimeStatus } from "@/features/attendance/types/attendanceType";
import { toUpperCase } from "zod";

type Props = {
    data?: EmployeesAttendanceResponse
    isLoading?: boolean;
    error?: Error | null
    page: number
    setPage: (page: number)=> void
    searchTerm?: string
}

export default function AttendanceTable({data, isLoading, error, page, setPage, searchTerm = ""} : Props) {
    const [ attendanceType, setAttendanceType ] = useState<AttendanceType>();
    const [ isViewDialogOpen, setViewDialogOpen ] = useState(false);
    const [selectedLog, setSelectedLog] = useState<EmployeeAttendance | null>(null);

    const logs = data?.logs ?? [];
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredLogs = logs.filter((log) => {
        if (!normalizedSearch) return true;

        const fullName = `${log.firstname} ${log.lastname}`.toLowerCase();
        const status = log.status.toLowerCase();
        const employeeId = log.employeeId.toLowerCase();

        return (
            fullName.includes(normalizedSearch) ||
            status.includes(normalizedSearch) ||
            employeeId.includes(normalizedSearch)
        );
    });

        
    const handleViewTimein = (log: EmployeeAttendance) => {
        setSelectedLog(log);
        setViewDialogOpen(true);
        setAttendanceType(AttendanceType.TIME_IN);
    }
    
    const handleViewTimeout = (log: EmployeeAttendance) => {
        setSelectedLog(log);
        setViewDialogOpen(true);
        setAttendanceType(AttendanceType.TIME_OUT);
    }

    //styles for statuses
    const statusStyles: Record<AttendanceStatus, string> = {
        [AttendanceStatus.COMPLETED]: "bg-green-100 text-green-600",
        [AttendanceStatus.IN_PROGRESS]: "bg-yellow-100 text-yellow-600",
        [AttendanceStatus.MISSING_TIMEOUT]: "bg-red-100 text-red-600",
        [AttendanceStatus.NO_RECORD]: "bg-gray-100 text-gray-600",
        [AttendanceStatus.ON_LEAVE]: "bg-blue-100 text-blue-600",
        [AttendanceStatus.SUSPENDED]: "bg-orange-100 text-orange-600"
    }

    const formatStatusText: Record<AttendanceStatus, string> = {
        [AttendanceStatus.COMPLETED]: "Complete Attendance",
        [AttendanceStatus.IN_PROGRESS]: "Clocked In",
        [AttendanceStatus.MISSING_TIMEOUT]: "Missing Timeout",
        [AttendanceStatus.NO_RECORD]: "No Attendance",
        [AttendanceStatus.ON_LEAVE]: "On Leave",
        [AttendanceStatus.SUSPENDED]: "Suspended"
    }

    const overtimeStatusStyle: Record<OvertimeStatus, string> = {
        [OvertimeStatus.APPROVED]: "bg-green-100 text-green-600",
        [OvertimeStatus.PENDING]: "bg-yellow-100 text-yellow-600",
        [OvertimeStatus.REJECTED]: "bg-red-100 text-red-600"
    }

    const formatOvertimeText: Record<OvertimeStatus, string> = {
        [OvertimeStatus.APPROVED]: "Overtime Approved",
        [OvertimeStatus.PENDING]: "Overtime Pending",
        [OvertimeStatus.REJECTED]: "Overtime Rejected"
    }

    return (
        <>
        <div className="flex flex-col space-y4">
            <div className="flex-1 overflow-x-auto border rounded-md">
                <Table>
                    <TableHeader className="bg-[#FFEB94]/40">
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Time In</TableHead>
                            <TableHead>Time Out</TableHead>
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
                                <TableCell colSpan={4} className="text-center py-8 text-red-400">
                                    Failed to load accounts.
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && !error && filteredLogs.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center ">
                                    {normalizedSearch ? "No results found" : "No attendance records found."}
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && !error && filteredLogs.length > 0 && 
                            filteredLogs.map((log)=> (
                                <TableRow key={log.id}>
                                    <TableCell>{`${log.firstname} ${log.lastname}`}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2 items-center justify-start">
                                            {formatTime(log.timein.timestamp)}
                                            <Button size="xs" className="px-4" 
                                                variant="outline" onClick={() => handleViewTimein(log)}>
                                                View
                                            </Button>
                                        </div>
                                        
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex gap-2 items-center justify-start">
                                            {formatTime(log.timeout.timestamp)}
                                            <Button size="xs" className="px-4" 
                                                variant="outline" onClick={() => handleViewTimeout(log)}>
                                                View
                                            </Button>
                                        </div>
                                        
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex gap-2">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-md ${statusStyles[log.status]}`}>
                                                {formatStatusText[log.status]}
                                            </span>

                                            {log.overtimeStatus && (
                                            <span className={`px-2 py-1 text-xs font-medium rounded-md ${overtimeStatusStyle[log.overtimeStatus]}`}>
                                                {formatOvertimeText[log.overtimeStatus]}
                                            </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Actions attendanceLog={log}/>
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
            <ViewDialog open={isViewDialogOpen} setOpen={setViewDialogOpen} 
                attendanceType={attendanceType} 
                timeInLocation={selectedLog?.timein.location}
                timeOutLocation={selectedLog?.timeout.location}
                timeInImage={selectedLog?.timein.image}
                timeOutImage={selectedLog?.timeout.image}
            />
        </>
    ); 
}