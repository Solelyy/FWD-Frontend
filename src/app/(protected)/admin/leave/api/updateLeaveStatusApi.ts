import { EmployeeLeaveRequest } from "../types/leave";
import { LeaveActionType } from "../types/leave-actions";
import { API_BASE_URL } from "@/lib/util/api";

export type UpdateLeaveStatusPayload = {
  id: EmployeeLeaveRequest["id"];
  leaveAction: LeaveActionType;
  adminReason?: string;
};
export async function updateLeaveStatusApi({
  id,
  leaveAction,
  adminReason,
}: UpdateLeaveStatusPayload) {
  const endpoint = "/admin/employee/update-status";
  const formattedText =
    leaveAction === LeaveActionType.APPROVE ? "approve" : "reject";

  const formatPayloadAction =
    leaveAction === LeaveActionType.APPROVE ? "APPROVED" : "REJECTED";

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id, status: formatPayloadAction, adminReason }),
  });

  const result = await response.json();

  console.log("updateLeaveStatus: ", result);

  if (!response.ok) {
    throw new Error(`Unable to ${formattedText} the leave request.`);
  }

  return result;
}
