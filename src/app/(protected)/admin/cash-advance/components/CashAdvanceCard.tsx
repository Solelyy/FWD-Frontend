import { EmployeesCARequestsSummary } from "../types/cash-advance"
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { PhilippinePesoIcon, Banknote, BanknoteArrowUp } from "lucide-react";
import CardContainerRequests from "@/components/shared/CardContainerRequests";
type Props = {
    data?: EmployeesCARequestsSummary;
}

export default function CashAdvanceCard({data}: Props) {

    const cards = [
        {title: "Cash Advance Requests", value: data?.totalRequests, icon:<Banknote />, iconTone: "blue" as const},
        {title: "Total Cash Advanced", value: data?.totalCashAdvance, showDecimal:true, icon: <PhilippinePesoIcon/>, iconTone: "success" as const },
        {title: "Pending Requests", value: data?.totalPendingRequests, icon:<BanknoteArrowUp/>, iconTone: "warning" as const}
    ]
    return (
        <div>
            <CardContainerRequests title=" Cash Advance Summary" gridClassName="grid-cols-2 gap-3 md:grid-cols-3">
                {cards.map((card) => 
                    <CardLayoutV2 key={card.title} title={card.title} dataCount={card.value ?? 0} showDecimal={card.showDecimal} icon={card.icon} iconTone={card.iconTone}/>
                )}
            </CardContainerRequests>
        </div>
    )
}