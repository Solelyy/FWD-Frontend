import { AttendanceStatusResponse, AttendanceStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";
import { API_BASE_URL } from "@/lib/util/api";
import { mockAttendanceStatus } from "../mock-data/attendance";

export async function getAttendanceApi():Promise<AttendanceStatusResponse> {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        return mockAttendanceStatus;
    }

    const response = await fetch(`${API_BASE_URL}/employee/attendance/today`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) throw new Error ("Cannot fetch attendance.");

    const result = await response.json();
    console.log("Fetch attendance: ", result);

    if (!result){
        return {
            status: AttendanceStatus.NO_RECORD,
            canTimeIn: true,
            isLate: false,
            isUndertime: false,
            timeIn: null,
            timeOut: null,
            timeInLocation: null,
            timeOutLocation: null,
            timeInImage: null,
            timeOutImage: null,
            isChanged: false,
            changes: {
                adminFirstname: "",
                adminLastname: "",
                reason: "",
                timestamp: ""
            }
        };
    }
    return result;
}