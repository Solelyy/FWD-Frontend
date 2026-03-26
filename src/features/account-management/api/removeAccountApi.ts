import { AccountInfo } from "../types/account";
import { API_BASE_URL } from "@/lib/util/api";
import { UserRole } from "@/lib/types/roles";

type RemoveAccountPayload = {
    employeeId: AccountInfo["employeeId"];
    role: AccountInfo["role"]
}

export async function removeAccountApi({employeeId, role}: RemoveAccountPayload) {
    const endpoint = role === UserRole.ADMIN
      ? "/superadmin/management/remove-user?"
      : "/admin/management/remove-user?";

    console.log(`User role: ${role}`);
    const response = await fetch(
        `${API_BASE_URL}${endpoint}employee=${employeeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
    
      if (!response.ok) {
        throw new Error("Failed to remove this account.");
      }
      return response.json();

}