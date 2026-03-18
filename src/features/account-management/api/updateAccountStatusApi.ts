import { UpdateAccountVariables } from "../hooks/useAccountMutations";
import { AccountInfo, Status } from "../types/account";
import { API_BASE_URL } from "@/lib/util/api";

export async function updateAccountStatus({
  employeeId,
  status,
}: UpdateAccountVariables) {
  const endpointsConfig: Partial<Record<Status, string>> = {
    // changed endpoints since they are the same
    [Status.ACTIVE]: "/superadmin/management/status",
    [Status.INACTIVE]: "/superadmin/management/status",
  };

  const endpoint = endpointsConfig[status];

  const response = await fetch(
    `${API_BASE_URL}${endpoint}?employee=${employeeId}`,
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
