import { PaginationSimple } from "@/components/shared/Pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { EmployeesLeaveReports } from "../types/leave";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { fullName } from "@/lib/util/name-format";

type Props = {
    data?: EmployeesLeaveReports;
    isLoading: boolean;
    error: Error | null;
    searchTerm?: string;
    page: number;
    setPage: (page: number) => void;
}

export default function ReportsLeaveTable({ data, isLoading, error, searchTerm = "", page, setPage }: Props) {
    const records = data?.records ?? [];

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredRecords = records.filter((record) => {
        if (!normalizedSearch) return true;

        const fullEmployeeName = `${record.firstname} ${record.lastname}`.toLowerCase();
        const employeeId = record.employeeId.toLowerCase();

        return fullEmployeeName.includes(normalizedSearch) || employeeId.includes(normalizedSearch);
    });

    return (
        <>
        <div className="flex flex-col space-y4">
            <div className="flex-1 overflow-x-auto border rounded-md">
                <Table>
                    <TableHeader className="bg-[#FFEB94]/40">
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Leave Used</TableHead>
                            <TableHead>Sick Leave Balance</TableHead>
                            <TableHead>Vacation Leave Balance</TableHead>
                            <TableHead>Accumulated Leave</TableHead>

                        </TableRow>
                    </TableHeader>
                            
                    <TableBody>
                        {isLoading && (
                            <AttendanceLogsSkeletonRows />
                        )}

                        {error && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-red-400">
                                    Failed to load leave report.
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && !error && records.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8">
                                    {normalizedSearch ? "No results found" : "No leave records yet."}
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && !error && filteredRecords.length > 0 && filteredRecords.map((record) => (
                            <TableRow key={record.employeeId}>
                                <TableCell>{fullName(record.firstname, record.lastname)}</TableCell>
                                <TableCell>{record.leaveUsed}</TableCell>
                                <TableCell>{record.sickLeaveBalance}</TableCell>
                                <TableCell>{record.vacationLeaveBalance}</TableCell>
                                <TableCell>{record.accumulatedLeave}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table> 
            </div>

            </div>
            <PaginationSimple
                page={page}
                total={data?.meta.total ?? 0}
                limit={data?.meta.limit ?? 10}
                onPageChange={setPage}
            />
        </>
    ); 
}