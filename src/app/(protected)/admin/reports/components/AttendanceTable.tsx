import { PaginationSimple } from "@/components/shared/Pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { EmployeeAttendances } from "../types/attendance";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { fullName } from "@/lib/util/name-format";

type Props = {
    data?: EmployeeAttendances;
    isLoading: boolean;
    error: Error | null;
    searchTerm?: string
    page: number;
    setPage: (page:number) => void
}
export default function ReportsAttendanceTable({data, isLoading, error, searchTerm="", page, setPage}: Props) {
    const records = data?.records ?? [];

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredRecords = records.filter((record) => {
        if (!normalizedSearch) return true;

        const fullName = `${record.firstname} ${record.lastname}`.toLowerCase();
        const employeeId = record.employeeId.toLowerCase();

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
                            <TableHead>Employee</TableHead>
                            <TableHead>Present</TableHead>
                            <TableHead>Absent</TableHead>
                            <TableHead>Late </TableHead>
                            <TableHead>Undertime</TableHead>
                            <TableHead>Overtime Hours</TableHead>
                            <TableHead>Total Working Hours</TableHead>
                            <TableHead>Total Payable Hours</TableHead>
                        </TableRow>
                    </TableHeader>
                            
                    <TableBody>
                        {isLoading && (
                            <AttendanceLogsSkeletonRows />
                        )}
                            
                        {error && (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-red-400">
                                    Failed to load accounts.
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && !error && records.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center ">
                                    No attendance records found.
                                </TableCell>
                            </TableRow>
                        )}          

                        {!isLoading && !error && filteredRecords.length > 0 && filteredRecords.map((record) => (
                            <TableRow key={record.employeeId}>
                                <TableCell>
                                    {fullName(record.firstname, record.lastname)}
                                </TableCell>

                                <TableCell>{record.presentDays}</TableCell>
                                <TableCell>{record.absentDays}</TableCell>
                              e  <TableCell>{record.late}</TableCell>
                                <TableCell>{record.overtimeHours}</TableCell>
                                <TableCell>{record.totalWorkingHours}</TableCell>
                                <TableCell>{record.totalPayableHours}</TableCell>
                            </TableRow>
                        ))}             

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