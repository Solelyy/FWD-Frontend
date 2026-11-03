"use client"

import { EmployeesSummaryResponse } from "../types/employees";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { UsersRound, UserCheck, UserX, Clock, ClockAlert, Ban} from "lucide-react"
import CardContainerRequests from "@/components/shared/CardContainerRequests";

type Props = {
    data?: EmployeesSummaryResponse
}
export default function EmployeesCards({data}: Props) {
    const cards = [
        {title: "Accounts", value:data?.totalAccounts, icon: <UsersRound />, iconTone: "blue" as const },
        {title: "Active", value:data?.totalActive, icon: <UserCheck />, iconTone: "success" as const},
        {title: "Inactive", value:data?.totalInactive, icon: <UserX />, iconTone: "neutral" as const},
        {title: "Pending ", value:data?.totalPending, icon: <Clock />, iconTone: "warning" as const},
        {title: "Expired", value:data?.totalExpired, icon: <ClockAlert />, iconTone: "orange" as const},
        {title: "Suspended", value:data?.totalSuspended, icon: <Ban />, iconTone: "danger" as const},

    ]

    return (
        <div>
            <CardContainerRequests gridClassName="grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {cards.map((card)=> 
                    <CardLayoutV2 key={card.title} title={card.title} dataCount={card.value ?? 0} icon={card.icon} iconTone={card.iconTone}/>
                )}
            </CardContainerRequests>
        </div>
    );
}