import { API_BASE_URL } from "@/lib/util/api";
import { AccountInfo, Status } from "../types/account";

type UpdateStatuspayload = {
  employeeId: AccountInfo["employeeId"]
  status: Status
}

export async function updateAccountStatus({employeeId, status}: UpdateStatuspayload) {
  const response = await fetch(
    `${API_BASE_URL}/superadmin/management/status?employee=${employeeId}`,
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
