import { AuthUser } from "@/lib/types/auth-user";
import { UserRole } from "@/lib/types/roles";
import { API_BASE_URL } from "@/lib/util/api";

export async function acceptDataPolicyApi(role: AuthUser["role"]) {
    const endpoint = role === UserRole.SUPER_ADMIN 
    ? "/users/superadmin-data-policy" : role === UserRole.ADMIN 
    ? "/users/admin-data-policy" 
    : "/employee-data-policy"
    
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to accept data policy.");
    }
    return response.json();
}