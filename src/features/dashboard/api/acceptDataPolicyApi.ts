import { AuthUser } from "@/lib/types/auth-user";
import { UserRole } from "@/lib/types/roles";

export async function acceptDataPolicyApi(role: AuthUser["role"]) {
    const endpoint = role === UserRole.SUPER_ADMIN 
    ? "/api/users/superadmin-data-policy" : role === UserRole.ADMIN 
    ? "/api/users/admin-data-policy" 
    : "/api/employee/data-policy"
    
    const response = await fetch(`${endpoint}`, {
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