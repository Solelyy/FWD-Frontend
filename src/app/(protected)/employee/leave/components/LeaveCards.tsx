import { CardLayoutAttendance } from "@/app/(protected)/admin/attendance/components/CardLayoutAttendance"
import { LeaveBalancesResponse } from "../types/leave";

type LeaveCardsProps = {
    data?: LeaveBalancesResponse;
}

export default function LeaveCards({ data }: LeaveCardsProps) {
    const cards = [
        {title: "Sick Leave Balance", value: data?.sickLeaveBalance, desc: "For medical or health-related absences"},
        {title: "Vacation Leave Balance", value: data?.vacationLeaveBalance, desc: "For personal time off or holidays"},
        {title: "Accumulated Leave Balance", value: data?.accumulatedLeave, desc: "Earned from approved overtime"}
    ]

    return (
        <div className="grid grid-cols-3 gap-4">
            {cards.map((c)=> (
                <CardLayoutAttendance
                    key={c.title}
                    title={c.title}
                    dataCount={c.value ?? 0}
                    description={c.desc}
                />
            ))}
        </div>
    );
}