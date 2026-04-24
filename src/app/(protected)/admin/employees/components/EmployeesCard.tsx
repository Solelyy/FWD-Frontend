"use client"

import { EmployeesSummaryResponse } from "../types/employees";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { UsersRound, UserCheck, UserX, Clock, ClockAlert, Ban} from "lucide-react"
import CardContainerAccs from "@/components/shared/CardContainerAccs";

type Props = {
    data?: EmployeesSummaryResponse
}
export default function EmployeesCards({data}: Props) {
    const cards = [
        {title: "Accounts", value:data?.totalAccounts, icon: <UsersRound /> },
        {title: "Active", value:data?.totalActive, icon: <UserCheck />},
        {title: "Inactive", value:data?.totalInactive, icon: <UserX />},
        {title: "Pending ", value:data?.totalPending, icon: <Clock />},
        {title: "Expired", value:data?.totalExpired, icon: <ClockAlert />},
        {title: "Suspended", value:data?.totalSuspended, icon: <Ban />},

    ]

    return (
        <div>
            <CardContainerAccs title="Employee Accounts Summary">
                {cards.map((card)=> 
                    <CardLayoutV2 key={card.title} title={card.title} dataCount={card.value ?? 0} icon={card.icon}/>    
                )}
            </CardContainerAccs>
        </div>
    );
}