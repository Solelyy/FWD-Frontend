import { API_BASE_URL } from "@/lib/util/api";
import { EmployeeAttendance } from "../types/attendance-types";
import { OvertimeStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";

export type UpdateOvertimeRequest = {
    employeeId: EmployeeAttendance["employeeId"];
    overtimeStatus?: OvertimeStatus;
    id: EmployeeAttendance["id"];
}
export async function updateOvertimeRequestApi({employeeId, overtimeStatus, id}:UpdateOvertimeRequest) {
    const endpoint = "/admin/employee/overtime/status"
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({attendanceId:id, status:overtimeStatus})
    });

    if (!response.ok) {
        throw new Error ("Unable to approve/reject overtime request.");
    }
    return response.json();
}