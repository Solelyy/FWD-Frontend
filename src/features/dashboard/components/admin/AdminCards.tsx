import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { AdminDashboardSummaryResponse } from "../../api/adminDashboardSummaryApi"
import { UsersRound, CalendarCheck, CalendarDays, Wallet, PhilippinePeso } from "lucide-react";

type Props = {
    data?: AdminDashboardSummaryResponse;
    isLoading: boolean;
    error: Error | null
} 
export default function AdminCards({data, isLoading, error}: Props) {
    const cards = [
        {title: "Total Employees", data: data?.totalEmployees, icon: <UsersRound />},
        {title: "Present Today", data: data?.presentToday, icon: <CalendarCheck />},
        {title: "On Leave", data: data?.onLeave, icon: <CalendarDays />},
        {title: "Pending Reimbursement", data: data?.pendingReimbursementRequest, icon: <Wallet />},
        {title: "Pending Cash Advance", data: data?.pendingCashAdvanceRequest, icon: <PhilippinePeso />},
    ]
    
    return (
        <div>
            {cards.map((c) => 
                <CardLayoutV2 key={c.title} title={c.title} dataCount={c.data ?? 0}>
                </CardLayoutV2>
            )}
        </div>
    )
}