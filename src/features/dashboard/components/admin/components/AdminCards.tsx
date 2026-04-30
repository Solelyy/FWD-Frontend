import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { UsersRound, CalendarCheck, CalendarDays, Wallet, PhilippinePeso } from "lucide-react";
import { AdminDashboardSummaryResponse } from "../types/dashboard-summary";
import CardContainer from "./CardContainer";

type Props = {
    data?: AdminDashboardSummaryResponse;
    isLoading?: boolean;
    error?: Error | null
} 
export default function AdminCards({data}: Props) {
    const cards = [
        {title: "Total Employees", data: data?.totalEmployees, icon: <UsersRound />},
        {title: "Present Today", data: data?.presentToday, icon: <CalendarCheck />},
        {title: "On Leave Today", data: data?.onLeaveToday, icon: <CalendarDays />},
        {title: "Reimbursement", data: data?.pendingReimbursementRequests, icon: <Wallet />, desc: "pending requests"},
        {title: "Cash Advance", data: data?.pendingCashAdvanceRequests, icon: <PhilippinePeso />, desc: "pending requests"},
    ]
    
    return (
        <div>
            <CardContainer>
                {cards.map((c) => 
                    <CardLayoutV2 key={c.title} title={c.title} dataCount={c.data ?? 0}  icon={c.icon} description={c.desc}/>
                )}
            </CardContainer>
            
        </div>
    )
}