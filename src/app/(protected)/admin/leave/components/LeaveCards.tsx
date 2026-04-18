import { CardLayout} from "@/components/shared/CardLayout";
import { LeaveStatsResponse } from "../types/leave";

type StatsProps = {
    data?: LeaveStatsResponse
}
export default function LeaveCards({data}: StatsProps) {
    const cards = [
        {title: "Total Requests", value:data?.totalRequests},
        {title: "Pending Leave", value:data?.pending},
        {title: "Approved Leave", value:data?.approved},
        {title: "Rejected Leave", value:data?.rejected},
    ]

    return (
        <div className="flex gap-4">
        {cards.map((c)=> (
            <CardLayout key={c.title} title={c.title} dataCount={c.value ?? 0}>
            </CardLayout>
        ))}
        </div>
    );
}