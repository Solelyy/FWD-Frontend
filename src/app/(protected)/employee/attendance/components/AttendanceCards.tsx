import { CardLayoutAttendance } from "@/app/(protected)/admin/attendance/components/CardLayoutAttendance"
import { AttendanceLogsResponse, OvertimeStatus } from "@/features/attendance/types/attendanceType"

type AttendanceCardsProps = {
    data?: AttendanceLogsResponse;
}

export default function AttendanceCards({ data }: AttendanceCardsProps) {
    const logs = data?.logs ?? [];

    const totalLogs = logs.length;
    const totalHoursWorked = logs.reduce((sum, log) => sum + (log.totalHours ?? 0), 0);
    const presentDays = logs.filter((log) => (log.totalHours ?? 0) > 0).length;

    const accumulatedOvertime = logs.reduce(
        (sum, log) => {
            if (log.overtimeStatus !== OvertimeStatus.APPROVED) return sum;
            return sum + Math.max((log.totalHours ?? 0) - 8, 0);
        },
        0,
    );

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CardLayoutAttendance title="Total Logs" dataCount={totalLogs}/>
            <CardLayoutAttendance title="Hours Worked" dataCount={totalHoursWorked}/>
            <CardLayoutAttendance title="Present Days" dataCount={presentDays}/>
            <CardLayoutAttendance title="Accumulated Overtime" dataCount={accumulatedOvertime}/>
        </div>
    )
}