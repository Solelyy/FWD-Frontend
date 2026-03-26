import { API_BASE_URL } from "@/lib/util/api";
import { AccountInfo, Status } from "../types/account";
import { UserRole } from "@/lib/types/roles";

type UpdateStatuspayload = {
  employeeId: AccountInfo["employeeId"]
  status: Status,
  role: AccountInfo["role"]
}

export async function updateAccountStatusApi({employeeId, status, role}: UpdateStatuspayload) {
  const endpoint = role === UserRole.ADMIN
      ? "/superadmin/management/status?"
      : "/admin/management/status?";

  const response = await fetch(
    `${API_BASE_URL}${endpoint}employee=${employeeId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ status }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update account status.");
  }
  return response.json();
}
