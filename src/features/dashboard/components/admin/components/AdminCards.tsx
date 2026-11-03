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
        {title: "Reimbursement", data: data?.pendingReimbursementRequests, icon: <Wallet />, pending: true},
        {title: "Cash Advance", data: data?.pendingCashAdvanceRequests, icon: <PhilippinePeso />, pending: true},
    ]
    
    return (
        <div>
            <CardContainer>
                {cards.map((c) => 
                    <CardLayoutV2
                        key={c.title}
                        title={c.title}
                        dataCount={c.data ?? 0}
                        icon={c.icon}
                        iconTone="blue"
                        valueAdornment={c.pending ? (
                            <span className="inline-flex shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium tracking-wide text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                                PENDING
                            </span>
                        ) : undefined}
                    />
                )}
            </CardContainer>
            
        </div>
    )
}