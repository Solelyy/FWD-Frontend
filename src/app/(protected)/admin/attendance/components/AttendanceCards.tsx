import { EmployeesAttendanceStatsResponse } from "../types/attendance-types";
import { CardLayout} from "@/components/shared/CardLayout";

type StatsProps = {
    data?: EmployeesAttendanceStatsResponse
}
export default function AttendanceCards({data}: StatsProps) {
    const cards = [
        {title: "Present Today", value:data?.presentToday},
        {title: "Absent Today", value:data?.absentToday},
        {title: "On Leave", value:data?.onLeave},
        {title: "Pending Overtime", value:data?.pendingOvertime},
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