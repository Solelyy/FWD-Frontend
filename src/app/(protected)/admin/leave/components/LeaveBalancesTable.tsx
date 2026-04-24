"use client"

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { fullName } from "@/lib/util/name-format";
import { EmployeesLeaveBalancesResponse } from "../types/leave-balances";

type Props = {
    data?: EmployeesLeaveBalancesResponse
    isLoading?: boolean;
    error?: Error | null
}
export default function LeaveBalancesTable({data, isLoading, error,}: Props) {

    const employee = data?.employees ?? [];

    return (
        <>
        <div className="flex flex-col space-y4">
            
            <div className="flex-1 overflow-x-auto border rounded-md">
                <Table>
                    <TableHeader className="bg-[#FFEB94]/40">
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Sick Leave</TableHead>
                            <TableHead>Vacation Leave</TableHead>
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
                                    Failed to load accounts.
                                </TableCell>
                            </TableRow>
                        )}
                        
                        {!isLoading && !error && employee.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center ">
                                    "No employee leave balances records yet."
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && !error && employee.length > 0 && 
                            employee.map((em)=> (
                                <TableRow key={em.id}>
                                    <TableCell>
                                        {fullName(em.firstname, em.lastname)}
                                    </TableCell>

                                    <TableCell>
                                        {em.sickLeaveBalance}
                                    </TableCell>

                                    <TableCell>
                                        {em.vacationLeaveBalance}
                                    </TableCell>
                                    
                                    <TableCell>
                                        {em.accumulatedLeave}
                                    </TableCell>
                                </TableRow>
                            ))
                        }    
                    </TableBody>
                </Table> 
            </div>
            </div>
        </>
    ); 
}