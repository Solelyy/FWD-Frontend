"use client"

import CardContainer from "@/components/shared/CardContainer";
import { EmployeesSummaryResponse } from "../types/employees";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { UsersRound, UserCheck, UserX, Clock} from "lucide-react"

type Props = {
    data?: EmployeesSummaryResponse
}
export default function EmployeesCards({data}: Props) {
    const cards = [
        {title: "Total Accounts", value:data?.totalAccounts, icon: <UsersRound /> },
        {title: "Active Accounts", value:data?.totalActive, icon: <UserCheck />},
        {title: "Inactive Accounts", value:data?.totalInactive, icon: <UserX />},
        {title: "Pending Accounts", value:data?.totalPending, icon: <Clock />},
    ]

    return (
        <div>
            <CardContainer title="Employee Accounts Summary">
                {cards.map((card)=> 
                    <CardLayoutV2 key={card.title} title={card.title} dataCount={card.value ?? 0} icon={card.icon}/>    
                )}
            </CardContainer>
        </div>
    );
}