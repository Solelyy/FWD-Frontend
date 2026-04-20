import { PaginationSimple } from "@/components/shared/Pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { EmployeesCARequestsResponse } from "../types/cash-advance";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { formatTableDate } from "@/lib/util/date-format";
import { fullName } from "@/lib/util/name-format";
import { formatPeso } from "@/lib/util/currency-format";
import { cashAdvanceStatusStyle, formatCashAdvanceStatusText } from "@/app/(protected)/employee/cash-advance/types/status-format";

type Props = {
    data?: EmployeesCARequestsResponse;
    isLoading: boolean;
    error: Error | null;
}
export default function CashAdvanceTable({data, isLoading, error}: Props) {

    const requests = data?.requests ?? [];
    return (
        <>
        <div className="flex flex-col space-y4">            
            <div className="flex-1 overflow-x-auto border rounded-md">
                <Table>
                    <TableHeader className="bg-[#FFEB94]/40">
                        <TableRow>
                            <TableHead>Date Submitted</TableHead>
                            <TableHead>Employee</TableHead>
                            <TableHead>Requested Amount</TableHead>
                            <TableHead>Approved Amount</TableHead>
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

                        {!isLoading && !error && requests?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center ">
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
                                    {fullName(request.firstname, request.lastname)}
                                </TableCell>

                                <TableCell>
                                    {formatPeso(request.requestedAmount)}
                                </TableCell>

                                <TableCell>
                                    {formatPeso(request.approvedAmount)}
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
            
            </div>
            {/*<PaginationSimple />  */} 
        </>
    ); 
}