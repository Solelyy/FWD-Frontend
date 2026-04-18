import { CardLayout } from "@/components/shared/CardLayout"
import { AttendanceSummaryResponse, } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType"

type AttendanceCardsProps = {
    data?: AttendanceSummaryResponse;
}

export default function AttendanceCards({ data }: AttendanceCardsProps) {

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CardLayout title="Total Logs" dataCount={data?.totalLogs ?? 0}/>
            <CardLayout title="Hours Worked" dataCount={data?.totalWorkedHours ?? 0}/>
            <CardLayout title="Present Days" dataCount={data?.presentDayss ?? 0}/>
            <CardLayout title="Accumulated Overtime" dataCount={data?.accumulatedOvertime ?? 0}/>
        </div>
    )
}