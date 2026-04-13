"use client"
import { PaginationSimple } from "@/components/shared/Pagination";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAttendanceLogs } from "@/features/dashboard/components/employee/hooks/useAttendanceLogs";
import { formatTableDate, formatTime } from "@/lib/util/date-format";
import { CalendarCheck } from "lucide-react";
import { ArrowDownToLine } from "lucide-react";
import { useState, useEffect } from "react";

export default function AttendanceLogs() {
    const [page, setPage] = useState(1);
    const limit = 10;
    const {data, isLoading, error } = useAttendanceLogs(page, limit);

    const attendanceLogs = data?.logs ?? [];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);
    return (
        <Card className="p-4 md:p-6 h-140">
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-2 items-center">
                    <p className="text-sm">Filter by</p>

                    <div className="border rounded-lg py-2 px-4 flex gap-3 items-center w-50 justify-between">
                        <p className="text-sm font-medium">This month</p>
                        <CalendarCheck size={18}/>
                    </div>
                </div>

                <div>
                    <Button variant="outline"> 
                        <ArrowDownToLine />
                        Download Report
                    </Button>
                </div>
            </div>
           
            <div className="flex-1 overflow-x-auto border rounded-md">
               <Table>
                    <TableHeader className="bg-[#FFEB94]/40">
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Time In</TableHead>
                            <TableHead>Time Out</TableHead>
                            <TableHead>Hours Worked</TableHead>
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

                        {!isLoading && !error && attendanceLogs?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center ">
                                    No attendance records found.
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && !error && attendanceLogs.length > 0 && 
                            attendanceLogs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell>{formatTableDate(log.date)}</TableCell>
                                    <TableCell>{formatTime(log.timeIn.timestamp)}</TableCell>
                                    <TableCell>{formatTime(log.timeOut.timestamp)}</TableCell>
                                    <TableCell>{log.totalHours ? `${log.totalHours}h` : "-"}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
               </Table> 
            </div>
            
            <PaginationSimple 
                page={page} 
                total={data?.meta.total ?? 0}
                limit={data?.meta.limit ?? 5}
                onPageChange={setPage}
            />
        </Card>
    );
}