import { AttendanceType } from "../types/attendanceType"
import { API_BASE_URL } from "@/lib/util/api";

export type attendanceSubmitApiPayload = {
    location: string,
    timeStamp: string,
    imageUrl: string,
    attendanceType: AttendanceType
}
//not final api
export async function attendanceSubmitApi({location, timeStamp, imageUrl, attendanceType} : attendanceSubmitApiPayload){
    const endpoint = attendanceType === AttendanceType.TIME_IN
    ? "/" 
    : "/";

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify("") //just if needed
    });

    if (!response.ok) {
        const error = await response.json();
        console.log(error.message);
        throw new Error(error.message || "Failed to submit attendance.");
    }

    return response.json();
}