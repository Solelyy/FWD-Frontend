import { PaginationSimple } from "@/components/shared/Pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";

export default function ReportsLeaveTable() {
    return (
        <>
        <div className="flex flex-col space-y4">
            <div className="flex-1 overflow-x-auto border rounded-md">
                <Table>
                    <TableHeader className="bg-[#FFEB94]/40">
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Leave Used</TableHead>
                            <TableHead>Leave Balance</TableHead>
                        </TableRow>
                    </TableHeader>
                            
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                                No records yet.
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table> 
            </div>

            </div>
            {/*<PaginationSimple />  */} 
        </>
    ); 
}