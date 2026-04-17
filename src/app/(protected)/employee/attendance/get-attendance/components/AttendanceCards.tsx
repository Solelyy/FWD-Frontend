import { CardLayoutAttendance } from "@/app/(protected)/admin/attendance/components/CardLayoutAttendance"
import { AttendanceSummaryResponse, } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType"

type AttendanceCardsProps = {
    data?: AttendanceSummaryResponse;
}

export default function AttendanceCards({ data }: AttendanceCardsProps) {

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CardLayoutAttendance title="Total Logs" dataCount={data?.totalLogs ?? 0}/>
            <CardLayoutAttendance title="Hours Worked" dataCount={data?.totalWorkedHours ?? 0}/>
            <CardLayoutAttendance title="Present Days" dataCount={data?.presentDayss ?? 0}/>
            <CardLayoutAttendance title="Accumulated Overtime" dataCount={data?.accumulatedOvertime ?? 0}/>
        </div>
    )
}