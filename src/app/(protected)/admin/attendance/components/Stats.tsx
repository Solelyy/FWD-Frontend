import { EmployeesAttendanceStatsResponse } from "../types/attendance-types";
import { CardLayoutAttendance } from "./CardLayoutAttendance";

type StatsProps = {
    data?: EmployeesAttendanceStatsResponse
}
export default function Stats({data}: StatsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CardLayoutAttendance title="Present Today" dataCount={data?.presentToday ?? 0}/>
            <CardLayoutAttendance title="Absent Today" dataCount={data?.absentToday ?? 0}/>
            <CardLayoutAttendance title="On Leave" dataCount={data?.onLeave ?? 0}/>
            <CardLayoutAttendance title="Pending Overtime" dataCount={data?.pendingOvertime ?? 0}/>
        </div>
    );
}