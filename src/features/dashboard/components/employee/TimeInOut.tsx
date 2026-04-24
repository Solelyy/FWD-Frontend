"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { formatTime, getTodayFormatted } from "@/lib/util/date-format";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PermissionDialog from "@/app/(protected)/employee/attendance/submit-attendance/components/PermissionDialog";
import { AttendanceStatus, AttendanceType, OvertimeStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";
import { useAttendance } from "@/app/(protected)/employee/attendance/get-attendance/hooks/useAttendance";
import { ViewDialog } from "./ViewDialog";

export default function TimeinOut() {
    const [ open, setOpen ] = useState(false);
    const [ attendanceType, setAttendanceType ] = useState<AttendanceType>();
    const {data: attendance, isLoading, error} = useAttendance();
    const [ isViewDialogOpen, setViewDialogOpen ] = useState(false);

    const handleTimeIn = () => {
        setOpen(true)
        setAttendanceType(AttendanceType.TIME_IN);
    }

    const handleTimeOut = () => {
        setOpen(true)
        setAttendanceType(AttendanceType.TIME_OUT);
    }

    const handleViewTimein = () => {
        setViewDialogOpen(true);
        setAttendanceType(AttendanceType.TIME_IN);
    }
    
    const handleViewTimeout = () => {
        setViewDialogOpen(true);
        setAttendanceType(AttendanceType.TIME_OUT);
    }

    const overtimeFormattedText: Record<OvertimeStatus, string> ={
        [OvertimeStatus.APPROVED]: "Overtime Approved",
        [OvertimeStatus.PENDING]: "Overtime Pending",
        [OvertimeStatus.REJECTED]: "Overtime Rejected"
    }

    return (
        <>
        <div className="flex flex-col flex-1">
            <p className="mb-2 text-sm font-light lg:text-base">My Attendance Today</p>
            <Card className="flex h-full flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center justify-start gap-2 text-base lg:text-lg">
                        <Calendar size={18}/>
                        {getTodayFormatted()}
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 lg:gap-5">
                    <div className="flex w-full gap-4 justify-between">
                        <div className="w-full">
                            <Button className="w-full lg:h-11 lg:text-base" 
                            onClick={handleTimeIn}
                            disabled={
                                attendance?.canTimeIn === false ||
                                attendance?.status === AttendanceStatus.COMPLETED ||
                                (attendance?.status === AttendanceStatus.IN_PROGRESS && !attendance?.canTimeIn)
                            }>
                                Time In
                            </Button>
                        </div>

                        <div className="w-full">
                            <Button className="w-full lg:h-11 lg:text-base" 
                            onClick={handleTimeOut}
                            disabled={attendance?.status=== AttendanceStatus.NO_RECORD || attendance?.status ===AttendanceStatus.COMPLETED}
                            >
                                Time Out
                            </Button>
                        </div>
                    </div> 


                    <div className="rounded-xl border p-3 lg:p-4">
                        <div className="flex justify-between">
                            <CardDescription className="lg:text-base">Time In</CardDescription>  
                            <Button size="xs" className="px-4 lg:h-8 lg:px-5 lg:text-sm" 
                            variant="outline" onClick={handleViewTimein}>
                                View
                            </Button>
                        </div>
                        
                        <p className="text-md lg:text-lg">
                            {attendance?.timeIn ? (
                                <span>
                                {formatTime(attendance.timeIn)}
                                {attendance.isLate && " (Late)"}
                                </span>
                            ) : (
                                "No time in yet"
                            )}
                        </p>
                    </div>

                    <div className="rounded-xl border p-3 lg:p-4">
                        <div className="flex justify-between">
                            <CardDescription className="lg:text-base">Time Out</CardDescription>  
                            <Button size="xs" className="px-4 lg:h-8 lg:px-5 lg:text-sm" 
                            variant="outline" onClick={handleViewTimeout}>
                                View
                            </Button>
                        </div>
                        
                        <p className="text-md lg:text-lg">
                            {attendance?.timeOut ? (
                                <span>
                                {formatTime(attendance.timeOut)}

                                {attendance.isUndertime
                                    ? " (Undertime)"
                                    : attendance.overtimeStatus
                                    ? ` (${overtimeFormattedText[attendance.overtimeStatus]})`
                                    : ""}
                                </span>
                            ) : (
                                "No time out yet"
                            )}
                        </p>
                    </div>   
                </CardContent>
            </Card>
        </div>

        <PermissionDialog setOpen={setOpen} open={open} attendanceType={attendanceType} />
        <ViewDialog open={isViewDialogOpen} setOpen={setViewDialogOpen} 
            attendanceType={attendanceType} 
            timeInLocation={attendance?.timeInLocation}
            timeOutLocation={attendance?.timeOutLocation}
            timeInImage={attendance?.timeInImage}
            timeOutImage={attendance?.timeOutImage}
        />
        </>
    );
}