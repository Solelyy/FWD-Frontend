import { EmployeeReimbursementSummary } from "../types/reimbursement";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { PhilippinePesoIcon, WalletCards, Wallet } from "lucide-react";
import CardContainerRequests from "@/components/shared/CardContainerRequests";
type Props = {
    data?: EmployeeReimbursementSummary;
}

export default function ReimbursementCard({data}: Props) {

    const cards = [
        {title: "Total Requests", value: data?.totalRequests, icon:<WalletCards />, iconTone: "blue" as const},
        {title: "Total Reimbursed", value: data?.totalReimbursed, showDecimal:true, icon: <PhilippinePesoIcon/>, iconTone: "success" as const },
        {title: "Pending Requests", value: data?.totalPending, icon: <Wallet />, iconTone: "warning" as const}
    ]
    return (
        <div>
            <CardContainerRequests title="Reimbursement Summary" gridClassName="grid-cols-2 gap-3 md:grid-cols-3">
                {cards.map((card) => 
                    <CardLayoutV2 key={card.title} title={card.title} dataCount={card.value ?? 0} showDecimal={card.showDecimal} icon={card.icon} iconTone={card.iconTone}/>
                )}
            </CardContainerRequests>
        </div>
    )
}