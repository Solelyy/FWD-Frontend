import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { UsersRound, CalendarCheck, CalendarDays, Wallet, PhilippinePeso } from "lucide-react";
import CardContainer from "./CardContainer";

type Props = {
    totalEmployees: number;
    presentToday: number;
    onLeave: number;
    cashAdvance: number;
    reimbursement: number
} 
export default function AdminCardsMock({totalEmployees, presentToday, onLeave, cashAdvance, reimbursement}: Props) {
    const cards = [
        {title: "Total Employees", data: totalEmployees, icon: <UsersRound />},
        {title: "Present Today", data: presentToday, icon: <CalendarCheck />},
        {title: "On Leave", data: onLeave, icon: <CalendarDays />},
        {title: "Reimbursement", data: reimbursement, icon: <Wallet />},
        {title: "Cash Advance", data: cashAdvance, icon: <PhilippinePeso />},
    ]
    
    return (
        <div>
            <CardContainer>
                {cards.map((c) => 
                    <CardLayoutV2 key={c.title} title={c.title} dataCount={c.data ?? 0} icon={c.icon} />
                )}
            </CardContainer>
        </div>
    )
}