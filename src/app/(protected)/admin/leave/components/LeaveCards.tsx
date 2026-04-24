import CardContainer from "@/components/shared/CardContainer";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { CalendarDays, Clock, CheckCircle, XCircle} from "lucide-react";
import { LeaveStatsResponse } from "../types/leave";
type Props = {
    data?: LeaveStatsResponse;
}

export default function CashAdvanceCard({data}: Props) {

    const cards = [
        {title: "Total Requests", value: data?.totalRequests, icon:<CalendarDays />},
        {title: "Approved Leave", value: data?.approved, icon:<Clock/>},
        {title: "Pending Leave", value: data?.pending, icon: <CheckCircle/> },
        {title: "Rejected Leave", value: data?.rejected, icon:<XCircle/>}
    ]
    return (
        <div>
            <CardContainer title=" Leave Summary">
                {cards.map((card) => 
                    <CardLayoutV2 key={card.title} title={card.title} dataCount={card.value ?? 0} icon={card.icon}/>
                )}
            </CardContainer>
        </div>
    )
}