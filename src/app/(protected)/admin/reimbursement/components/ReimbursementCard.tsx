import CardContainer from "@/components/shared/CardContainer";
import { EmployeeReimbursementSummary } from "../types/reimbursement";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { PhilippinePesoIcon, WalletCards, Wallet } from "lucide-react";
type Props = {
    data?: EmployeeReimbursementSummary;
}

export default function ReimbursementCard({data}: Props) {

    const cards = [
        {title: "Total Requests", value: data?.totalRequests, icon:<WalletCards />},
        {title: "Total Reimbursed", value: data?.totalReimbursed, showDecimal:true, icon: <PhilippinePesoIcon/> },
        {title: "Pending Requests", value: data?.totalPending, icon:<Wallet />}
    ]
    return (
        <div>
            <CardContainer title="Reimbursement Summary">
                {cards.map((card) => 
                    <CardLayoutV2 key={card.title} title={card.title} dataCount={card.value ?? 0} showDecimal={card.showDecimal} icon={card.icon}/>
                )}
            </CardContainer>
        </div>
    )
}