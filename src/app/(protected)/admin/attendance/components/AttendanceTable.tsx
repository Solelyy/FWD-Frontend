import { PaginationSimple } from "@/components/shared/Pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { EmployeesAttendanceResponse } from "../types/attendance-types";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { formatTime } from "@/lib/util/date-format";
import Actions from "./Actions";

type Props = {
    data?: EmployeesAttendanceResponse
    isLoading?: boolean;
    error?: Error | null
    page: number
    setPage: (page: number)=> void
}

export default function AttendanceTable({data, isLoading, error, page, setPage} : Props) {
    const logs = data?.logs ?? [];

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

                        {!isLoading && !error && logs.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center ">
                                    No attendance records found.
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && !error && logs.length > 0 && 
                            logs.map((log)=> (
                                <TableRow key={log.id}>
                                    <TableCell>{`${log.employeeName.firstname} ${log.employeeName.lastname}`}</TableCell>
                                    <TableCell>{formatTime(log.timein.timestamp)}</TableCell>
                                    <TableCell>{formatTime(log.timeout.timestamp)}</TableCell>
                                    <TableCell>{log.status}</TableCell>
                                    <TableCell>
                                        <Actions data={data}/>
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