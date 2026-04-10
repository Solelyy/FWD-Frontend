import Stats from "./components/Stats"
import AttendanceTableWrapper from "./components/AttendanceTableWrapper"

export default function Attendance() {
    return (
        <div className="flex flex-col space-y-6">
            <Stats />
            <AttendanceTableWrapper />
        </div>
    )
}