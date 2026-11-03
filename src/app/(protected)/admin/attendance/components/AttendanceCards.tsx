"use client"

import CardContainerRequests from "@/components/shared/CardContainerRequests";
import { EmployeesAttendanceStatsResponse } from "../types/attendance-types";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { UserCheck, UserX, CalendarOff, Clock} from "lucide-react"
type StatsProps = {
    data?: EmployeesAttendanceStatsResponse
}
export default function AttendanceCards({data}: StatsProps) {
    const cards = [
        {title: "Present Today", value:data?.presentToday, icon: <UserCheck />, iconTone: "success" as const },
        {title: "Absent Today", value:data?.absentToday, icon: <UserX />, iconTone: "danger" as const},
        {title: "On Leave", value:data?.onLeave, icon: <CalendarOff />, iconTone: "orange" as const},
        {title: "Pending Overtime", value:data?.pendingOvertime, icon: <Clock />, iconTone: "warning" as const},
    ]

    return (
        <div>
            <CardContainerRequests gridClassName="grid-cols-2 gap-3 md:grid-cols-4">
                {cards.map((card)=> 
                    <CardLayoutV2 key={card.title} title={card.title} dataCount={card.value ?? 0} icon={card.icon} iconTone={card.iconTone}/>
                )}
            </CardContainerRequests>
        </div>
    );
}