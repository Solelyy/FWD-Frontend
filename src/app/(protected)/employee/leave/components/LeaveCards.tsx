import CardContainer from "@/components/shared/CardContainer"
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2"
import { LeaveBalancesResponse } from "../types/leave";
import CardContainerRequests from "@/components/shared/CardContainerRequests";
import { Stethoscope, Palmtree, CalendarPlus } from "lucide-react";
type LeaveCardsProps = {
    data?: LeaveBalancesResponse;
}

export default function LeaveCards({ data }: LeaveCardsProps) {
    const cards = [
        {title: "Sick Leave Balance", value: data?.sickLeaveBalance, desc: "For medical or health-related absences", icon: <Stethoscope />},
        {title: "Vacation Leave Balance", value: data?.vacationLeaveBalance, desc: "For personal time off or holidays", icon: <Palmtree />},
        {title: "Accumulated Leave Balance", value: data?.accumulatedLeave, desc: "Earned from approved overtime", icon: <CalendarPlus />}
    ]

    return (
        <CardContainerRequests title="Leave Summary">
            {cards.map((c)=> (
                <CardLayoutV2
                    key={c.title}
                    title={c.title}
                    dataCount={c.value ?? 0}
                    description={c.desc}
                    icon= {c.icon}
                />
            ))}
        </CardContainerRequests>
    );
}