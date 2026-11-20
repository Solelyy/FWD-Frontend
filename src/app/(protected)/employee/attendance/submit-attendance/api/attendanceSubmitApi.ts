import { AttendanceType } from "../types/attendanceType"

export type attendanceSubmitApiPayload = {
    location: string | null,
    imageUrl: string | null,
    attendanceType: AttendanceType | undefined
    isOvertime?: boolean
}
//not final api
export async function attendanceSubmitApi({location, imageUrl, attendanceType, isOvertime} : attendanceSubmitApiPayload){
    const endpoint = attendanceType === AttendanceType.TIME_IN
    ? "/api/employee/attendance/time-in" 
    : isOvertime 
    ? "/api/employee/attendance/overtime/time-out"
    : "/api/employee/attendance/time-out"

    const payload = {
        location,
        imageUrl,
    };
    console.log("Payload", payload);

    const response = await fetch(`${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(payload) //just if needed
    });

    if (!response.ok) {
        const error = await response.json();
        console.log(error.message);
        throw new Error(error.message || "Failed to submit attendance.");
    }

    return response.json();
}