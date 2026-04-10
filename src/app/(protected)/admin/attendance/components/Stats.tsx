import { CardLayoutAttendance } from "./CardLayoutAttendance";

export default function Stats() {

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CardLayoutAttendance title="Present Today" dataCount={0}/>
            <CardLayoutAttendance title="Absent" dataCount={0}/>
            <CardLayoutAttendance title="On Leave" dataCount={0}/>
            <CardLayoutAttendance title="Pending Overtime" dataCount={0}/>
        </div>
    )
}