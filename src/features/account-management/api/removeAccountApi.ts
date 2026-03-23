import { AccountInfo } from "../types/account";
import { API_BASE_URL } from "@/lib/util/api";

export async function removeAccountApi({employeeId}: {employeeId: AccountInfo["employeeId"]}) {
    const endpoint = "/superadmin/management/remove-user?";

    const response = await fetch(
        `${API_BASE_URL}${endpoint}/employeeId=${employeeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
    
      if (!response.ok) {
        throw new Error("Failed to update account status.");
      }
      return response.json();

}