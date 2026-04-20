import CardContainer from "@/components/shared/CardContainer";
import { EmployeesCARequestsSummary } from "../types/cash-advance"
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { PhilippinePesoIcon, Banknote, BanknoteArrowUp } from "lucide-react";
type Props = {
    data?: EmployeesCARequestsSummary;
}

export default function CashAdvanceCard({data}: Props) {

    const cards = [
        {title: "Total Requests", value: data?.totalRequests, icon:<Banknote />},
        {title: "Total Cash Advanced", value: data?.totalCashAdvanced, showDecimal:true, icon: <PhilippinePesoIcon/> },
        {title: "Pending Requests", value: data?.totalPendingRequests, icon:<BanknoteArrowUp/>}
    ]
    return (
        <div>
            <CardContainer title=" Cash Advance Summary">
                {cards.map((card) => 
                    <CardLayoutV2 key={card.title} title={card.title} dataCount={card.value ?? 0} showDecimal={card.showDecimal} icon={card.icon}/>
                )}
            </CardContainer>
        </div>
    )
}