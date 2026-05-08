"use client"

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCoworkersAttendance } from "../hooks/useCoworkersAttendance";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { fullName } from "@/lib/util/name-format";
import { formatTime, getTodayFormatted } from "@/lib/util/date-format";
import {statusStyles, formatStatusText} from "@/app/(protected)/admin/attendance/types/status-format"
import AvatarInitials from "@/lib/components/AvatarInitials";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ViewSelfiesLocationsDialog } from "./ViewSelfiesLocations";
import { useState } from "react";
import { CoworkerAttendance } from "../types/coworkers";
import { AttendanceStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";

export default function CoWorkers() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const {data, isLoading, error} = useCoworkersAttendance(day, month, year);

    const attendance = data?.records ?? [];

    const [showSelfiesLocations, setShowSelfiesLocations] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<CoworkerAttendance | null>(null);

    const handleView = (record: CoworkerAttendance) => {
        setSelectedRecord(record);
        setShowSelfiesLocations(true);
    }

    return (
        <>
        <div className="flex flex-col flex-1">
            <p className="mb-2 text-sm font-light lg:text-base">My Co-Engineers</p>

            <Card className="px-6 py-5 lg:px-8 lg:py-6 flex-1 overflow-hidden">
                <CardTitle>Engineers Daily Attendance</CardTitle>
                <CardDescription>Attendance records of all engineers for today.</CardDescription>
                <ScrollArea className="overflow-x-auto rounded-xl border h-70 sm:h-80 lg:h-90">
                    <Table className="lg:text-base">
                        <TableHeader className="bg-[#FFEB94]/40">
                            <TableRow>
                                <TableHead>Employee Name</TableHead>
                                <TableHead>Time In</TableHead>
                                <TableHead>Time Out</TableHead>
                                <TableHead>Locations</TableHead>
                                <TableHead>Status</TableHead>
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

                            {!isLoading && !error && attendance?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8">
                                        No other engineers attendance records yet.
                                    </TableCell>
                                </TableRow>
                            )}

                            {!isLoading && !error && attendance.length > 0 && attendance.map((log) => (
                                <TableRow key={log.employeeId}>
                                    <TableCell>
                                        <div className="flex gap-4 items-center">
                                            <AvatarInitials firstname={log.firstname} lastname={log.lastname}/>
                                            {fullName(log.firstname, log.lastname)}

                                        </div>
                                    </TableCell>
                                        
                                    <TableCell>
                                        {log.timeIn.timeStamp 
                                            ? formatTime(log.timeIn.timeStamp)
                                            : log.status === AttendanceStatus.ON_LEAVE || AttendanceStatus.SUSPENDED
                                            ? "-"
                                            : "No record"
                                        }
                                    </TableCell>

                                    <TableCell>
                                        {log.timeOut.timeStamp 
                                            ? formatTime(log.timeOut.timeStamp)
                                            : log.status === AttendanceStatus.ON_LEAVE || AttendanceStatus.SUSPENDED
                                            ? "-"
                                            : "No record"
                                        }
                                    </TableCell>

                                    <TableCell>
                                        {(log.timeIn.timeStamp || log.timeOut.timeStamp) 
                                            && log.status !== AttendanceStatus.ON_LEAVE 
                                            && log.status !== AttendanceStatus.SUSPENDED &&
                                            <Button 
                                                variant="outline" size="sm" className="px-6"
                                                onClick={() => handleView(log)}
                                            >
                                                View Locations
                                            </Button>
                                        }
                                    </TableCell>

                                    <TableCell>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-md ${statusStyles[log.status]}`}>
                                            {formatStatusText[log.status]}
                                        </span>
                                    </TableCell>
                                </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </ScrollArea>
            </Card>
        </div>
        <ViewSelfiesLocationsDialog 
            open={showSelfiesLocations} 
            setOpen={setShowSelfiesLocations}
            timeInLocation = {selectedRecord?.timeIn.location} 
            timeOutLocation={selectedRecord?.timeOut.location} 
            status={selectedRecord?.status}
        />
        </>
    );
}