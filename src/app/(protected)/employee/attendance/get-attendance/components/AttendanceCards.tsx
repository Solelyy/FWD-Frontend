import CardContainer from "@/components/shared/CardContainer"
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2"
import { AttendanceSummaryResponse, } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType"
import { CalendarDays, Clock, CheckCircle, Timer } from "lucide-react"

type AttendanceCardsProps = {
    data?: AttendanceSummaryResponse;
}

export default function AttendanceCards({ data }: AttendanceCardsProps) {
    const cards = [
        { title: "Total Logs", value: data?.totalLogs, icon: <CalendarDays /> },
        { title: "Hours Worked", value: data?.totalWorkedHours, icon: <Clock /> },
        { title: "Present Days", value: data?.presentDays, icon: <CheckCircle /> },
        { title: "Accumulated Overtime", value: data?.accumulatedOvertime, icon: <Timer /> },
    ]

    return (
        <CardContainer title="Attendance Summary">
            {cards.map((card) => (
                <CardLayoutV2
                    key={card.title}
                    title={card.title}
                    dataCount={card.value ?? 0}
                    icon={card.icon}
                />
            ))}
        </CardContainer>
    )
}