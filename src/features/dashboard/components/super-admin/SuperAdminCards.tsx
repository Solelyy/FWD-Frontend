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
        {title: "Total Admins", data: totalAdmins, icon: <UsersRound />},
        {title: "Total Employees", data: totalEmployees, icon: <UsersRound />},
        {title: "Active Accounts", data: activeAccounts, icon: <UsersRound />},
    ]
    
    return (
        <div>
            <CardContainerRequests>
                {cards.map((c) => 
                    <CardLayoutV2 key={c.title} title={c.title} dataCount={c.data ?? 0} icon={c.icon} />
                )}
            </CardContainerRequests>
        </div>
    )
}