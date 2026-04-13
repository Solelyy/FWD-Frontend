"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { formatTime, getTodayFormatted } from "@/lib/util/date-format";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PermissionDialog from "@/features/attendance/components/PermissionDialog";
import { AttendanceStatus, AttendanceType } from "@/features/attendance/types/attendanceType";
import { useAttendance } from "./hooks/useAttendance";
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
    return (
        <>
        <div className="flex flex-col flex-1">
            <p className="font-light text-sm mb-2">My Attendance Today</p>
            <Card className="flex flex-col h-full">
                <CardHeader>
                    <CardTitle className="flex gap-2 items-center justify-start">
                        <Calendar size={15}/>
                        {getTodayFormatted()}
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    <div className="flex gap-4 w-full justify-between">
                        <div className="w-full">
                            <Button className="w-full" 
                            onClick={handleTimeIn}
                            disabled={
                                attendance?.status === AttendanceStatus.COMPLETED ||
                                (attendance?.status === AttendanceStatus.IN_PROGRESS && !attendance?.canTimeIn)
                            }>
                                Time In
                            </Button>
                        </div>

                        <div className="w-full">
                            <Button className="w-full" 
                            onClick={handleTimeOut}
                            disabled={attendance?.status=== AttendanceStatus.NONE || attendance?.status ===AttendanceStatus.COMPLETED}
                            >
                                Time Out
                            </Button>
                        </div>
                    </div> 


                    <div className="border rounded p-2">
                        <div className="flex justify-between">
                            <CardDescription>Time In</CardDescription>  
                            <Button size="xs" className="px-4" 
                            variant="outline" onClick={handleViewTimein}>
                                View
                            </Button>
                        </div>
                        
                        <p className="text-sm">
                            {attendance?.timeIn
                            ? formatTime(attendance?.timeIn, {
                                isLate: attendance?.isLate
                            })
                            : "No time in yet"
                            }
                            
                        </p>
                    </div>

                    <div className="border rounded p-2">
                        <div className="flex justify-between">
                            <CardDescription>Time Out</CardDescription>  
                            <Button size="xs" className="px-4" 
                            variant="outline" onClick={handleViewTimeout}>
                                View
                            </Button>
                        </div>
                        
                        <p className="text-sm">
                            {attendance?.timeOut 
                            ? formatTime(attendance?.timeOut, { 
                                isUndertime: attendance?.isUndertime
                            })
                            : "No time out yet"
                            }
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