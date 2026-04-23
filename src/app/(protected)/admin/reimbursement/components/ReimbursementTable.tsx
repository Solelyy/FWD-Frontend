import { PaginationSimple } from "@/components/shared/Pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { EmployeeReimbursementRequests } from "../types/reimbursement";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { formatTableDate } from "@/lib/util/date-format";
import { fullName } from "@/lib/util/name-format";
import { ReimbursementType } from "@/app/(protected)/employee/reimbursement/types/reimbursement";
import { reimbursementStatusStyle, formatReimbursementStatusText } from "@/app/(protected)/employee/reimbursement/types/format";
import ReimbursementActions from "./ReimbursementActions";

type Props = {
    data?: EmployeeReimbursementRequests
    isLoading: boolean;
    error: Error | null;
    page: number
    setPage: (page: number)=> void
    searchTerm?: string
}
export default function ReimbursementTable({data, isLoading, error, page, setPage, searchTerm = ""}: Props) {
    const requests= data?.requests ?? [];

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

    const formatText = (type: ReimbursementType) => {
        const format = type === ReimbursementType.FOOD 
            ? "Food" 
            : ReimbursementType.OTHER
            ? "Other" : "Transportation"
    
            return format;
    }
    return (
        <>
        <div className="flex flex-col space-y4">
            
            <div className="flex-1 overflow-x-auto border rounded-md">
                <Table>
                    <TableHeader className="bg-[#FFEB94]/40">
                        <TableRow>
                            <TableHead>Date Submitted</TableHead>
                            <TableHead>Employee</TableHead>
                            <TableHead>Type</TableHead>
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
                                <TableCell colSpan={5} className="text-center py-8 text-red-400">
                                    Failed to load accounts.
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && !error && filteredRequests.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center ">
                                    No attendance records found.
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && !error && filteredRequests.length > 0 && filteredRequests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>
                                    {formatTableDate(request.dateSubmitted)}
                                </TableCell>

                                <TableCell>
                                    {fullName(request.firstname, request.lastname)}
                                </TableCell>

                                <TableCell>
                                    {formatText(request.type)}
                                </TableCell>

                                <TableCell>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${reimbursementStatusStyle[request.status]}`}>
                                        {formatReimbursementStatusText[request.status]}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    <ReimbursementActions request={request}/>
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