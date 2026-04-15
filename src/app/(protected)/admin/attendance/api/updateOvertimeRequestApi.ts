import { API_BASE_URL } from "@/lib/util/api";
import { EmployeeAttendance } from "../types/attendance-types";
import { OvertimeStatus } from "@/features/attendance/types/attendanceType";

export type UpdateOvertimeRequest = {
    employeeId: EmployeeAttendance["id"];
    overtimeStatus?: OvertimeStatus
}
export async function updateOvertimeRequestApi({employeeId, overtimeStatus}:UpdateOvertimeRequest) {
    const endpoint = "/"
    const response = await fetch(`${API_BASE_URL}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({overtimeStatus})
    });

    if (!response.ok) {
        throw new Error ("Unable to approve/reject overtime request.");
    }
    return response.json();
}