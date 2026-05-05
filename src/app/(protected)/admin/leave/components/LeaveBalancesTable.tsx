"use client"

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { fullName } from "@/lib/util/name-format";
import { EmployeesLeaveBalancesResponse } from "../types/leave-balances";
import AvatarInitials from "@/lib/components/AvatarInitials";

type Props = {
    data?: EmployeesLeaveBalancesResponse
    isLoading?: boolean;
    error?: Error | null
}
export default function LeaveBalancesTable({data, isLoading, error,}: Props) {

    const employee = data?.employees ?? [];

    const balanceStyle = (balance: number) => {
        if(balance <= 2) {
            return <span className="text-red-500">{balance}</span>
        } else {
            return <span>{balance}</span>
        }
    }

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
                                <TableCell colSpan={5} className="text-center py-8">
                                    "No employee leave balances records yet."
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && !error && employee.length > 0 && 
                            employee.map((em)=> (
                                <TableRow key={em.id}>
                                    <TableCell>
                                        <div className="flex gap-4 items-center">
                                            <AvatarInitials firstname={em.firstname} lastname={em.lastname}/>
                                            {fullName(em.firstname, em.lastname)}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {balanceStyle(em.sickLeaveBalance)}
                                    </TableCell>

                                    <TableCell>
                                        {balanceStyle(em.vacationLeaveBalance)}
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