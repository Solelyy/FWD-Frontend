import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { UsersRound } from "lucide-react";
import CardContainerRequests from "@/components/shared/CardContainerRequests";

type Props = {
    totalAdmins: number;
    totalEmployees: number;
    activeAccounts: number;
} 
export default function SuperAdminCards({totalEmployees, totalAdmins, activeAccounts}: Props) {
    const cards = [
        {title: "Total Admins", data: totalAdmins, icon: <UsersRound />, iconTone: "blue" as const},
        {title: "Total Employees", data: totalEmployees, icon: <UsersRound />, iconTone: "blue" as const},
        {title: "Active Accounts", data: activeAccounts, icon: <UsersRound />, iconTone: "blue" as const},
    ]
    
    return (
        <div>
            <CardContainerRequests>
                {cards.map((c) => 
                    <CardLayoutV2 key={c.title} title={c.title} dataCount={c.data ?? 0} icon={c.icon} iconTone={c.iconTone} />
                )}
            </CardContainerRequests>
        </div>
    )
}