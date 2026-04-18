"use client"
import { MonthYearPicker } from "@/components/shared/MonthYearPicker";
import { PaginationSimple } from "@/components/shared/Pagination";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAttendanceLogs } from "../hooks/useAttendanceLogs";
import { formatTableDate, formatTime } from "@/lib/util/date-format";
import { ArrowDownToLine } from "lucide-react";
import { useState, useEffect } from "react";
import AttendanceCards from "./AttendanceCards";
import { useAttendanceSummary } from "../hooks/useAttendanceSummary";

export default function AttendanceLogs() { 
    const today = new Date();

    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [page, setPage] = useState(1);
    const limit = 15;
    const {data, isLoading, error } = useAttendanceLogs(page, limit, year, month);
    const {data: summary, isLoading: isSummaryLoading } = useAttendanceSummary(month, year);

    const attendanceLogs = data?.logs ?? [];
   
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    useEffect(() => {
        setPage(1)
        console.log(`Month: ${month}, Year: ${year}`);
    }, [year, month])
    return (
        <div className="flex flex-col space-y-4 md:space-y-6">
        <AttendanceCards data={summary} />
        <Card className="p-4 md:p-6 h-140">
            <div className="flex flex-row justify-between w-full gap-2">
                <div className="flex flex-row gap-2 items-center">
                    <p className="text-sm text-nowrap">Filter by</p>
                    <MonthYearPicker year={year} month={month} onYearChange={setYear} onMonthChange={setMonth}/>
                </div>

                <div>
                    <Button> 
                        <ArrowDownToLine />
                        <span className="md:hidden">Download</span>
                        <span className="hidden md:inline">Download Report</span>
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
        </div>
    );
}