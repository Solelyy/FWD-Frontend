"use client"

import CardContainer from "@/components/shared/CardContainer";
import { EmployeesAttendanceStatsResponse } from "../types/attendance-types";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { UserCheck, UserX, CalendarOff, Clock} from "lucide-react"
type StatsProps = {
    data?: EmployeesAttendanceStatsResponse
}
export default function AttendanceCards({data}: StatsProps) {
    const cards = [
        {title: "Present Today", value:data?.presentToday, icon: <UserCheck /> },
        {title: "Absent Today", value:data?.absentToday, icon: <UserX />},
        {title: "On Leave", value:data?.onLeave, icon: <CalendarOff />},
        {title: "Pending Overtime", value:data?.pendingOvertime, icon: <Clock />},
    ]

    return (
        <div>
            <CardContainer title="Attendance Summary">
                {cards.map((card)=> 
                    <CardLayoutV2 key={card.title} title={card.title} dataCount={card.value ?? 0} icon={card.icon}/>    
                )}
            </CardContainer>
        </div>
    );
}