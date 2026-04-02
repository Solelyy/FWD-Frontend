"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { getTodayFormatted } from "@/lib/util/date-format";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PermissionDialog from "@/features/attendance/components/PermissionDialog";
import { AttendanceType } from "@/features/attendance/types/attendanceType";

export default function TimeinOut() {
    const [ open, setOpen ] = useState(false);
    const [ attendanceType, setAttendanceType ] = useState<AttendanceType>();

    const handleTimeIn = () => {
        setOpen(true)
        setAttendanceType(AttendanceType.TIME_IN)
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
                            <Button className="w-full" onClick={handleTimeIn}>
                                Time In
                            </Button>
                        </div>

                        <div className="w-full">
                            <Button className="w-full" disabled>
                                Time Out
                            </Button>
                        </div>
                    </div> 


                    <div className="border rounded p-2">
                        <div className="flex justify-between">
                            <CardDescription>Time In</CardDescription>  
                            <Button size="xs" className="px-4" variant="secondary">View</Button>
                        </div>
                        
                        <p className="text-sm">No record yet</p>
                    </div>

                    <div className="border rounded p-2">
                        <div className="flex justify-between">
                            <CardDescription>Time Out</CardDescription>  
                            <Button size="xs" className="px-4" variant="secondary">View</Button>
                        </div>
                        
                        <p className="text-sm">No record yet</p>
                    </div>   
                </CardContent>
            </Card>
        </div>

        <PermissionDialog setOpen={setOpen} open={open} attendanceType={attendanceType} />
        </>
    );
}