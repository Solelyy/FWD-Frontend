import { API_BASE_URL } from "@/lib/util/api";
import { EmployeeAttendance } from "../types/attendance-types";
import { OvertimeStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";

export type UpdateOvertimeRequest = {
    employeeId: EmployeeAttendance["employeeId"];
    overtimeStatus?: OvertimeStatus;
}
export async function updateOvertimeRequestApi({employeeId, overtimeStatus}:UpdateOvertimeRequest) {
    const endpoint = overtimeStatus === OvertimeStatus.APPROVED 
    ? "/" // approve overtime
    : "/" // reject
    const response = await fetch(`${API_BASE_URL}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({employeeId,})
    });

    if (!response.ok) {
        throw new Error ("Unable to approve/reject overtime request.");
    }
    return response.json();
}