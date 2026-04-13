import { AttendanceStatusResponse, AttendanceStatus } from "@/features/attendance/types/attendanceType";
import { API_BASE_URL } from "@/lib/util/api";

export async function getAttendanceApi():Promise<AttendanceStatusResponse> {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) throw new Error ("Cannot fetch attendance.");

    const result = await response.json();
    console.log("Fetch attendance: ", result);

    if (!result){
        return{
            status: AttendanceStatus.NONE,
            canTimeIn: true,
            isLate: false,
            isUndertime: false,
            timeIn: null,
            timeOut: null,
            timeInLocation: null,
            timeOutLocation: null,
            timeInImage: null,
            timeOutImage: null,
            overtimePending: false,
        };
    }
    return result;
}