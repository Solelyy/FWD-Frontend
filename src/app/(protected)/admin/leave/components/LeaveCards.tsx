import CardContainerRequests from "@/components/shared/CardContainerRequests";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { CalendarDays, Clock, CheckCircle, XCircle} from "lucide-react";
import { LeaveStatsResponse } from "../types/leave";
type Props = {
    data?: LeaveStatsResponse;
}

export default function CashAdvanceCard({data}: Props) {

    const cards = [
        {title: "Total Requests", value: data?.totalRequests, icon:<CalendarDays />, iconTone: "blue" as const},
        {title: "Approved Leave", value: data?.approved, icon:<Clock/>, iconTone: "success" as const},
        {title: "Pending Leave", value: data?.pending, icon: <CheckCircle/>, iconTone: "warning" as const },
        {title: "Rejected Leave", value: data?.rejected, icon:<XCircle/>, iconTone: "danger" as const}
    ]
    return (
        <div>
            <CardContainerRequests gridClassName="grid-cols-2 gap-3 md:grid-cols-4">
                {cards.map((card) => 
                    <CardLayoutV2 key={card.title} title={card.title} dataCount={card.value ?? 0} icon={card.icon} iconTone={card.iconTone}/>
                )}
            </CardContainerRequests>
        </div>
    )
}