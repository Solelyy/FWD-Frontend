import { UserRole } from "@/lib/types/roles";
import { API_BASE_URL } from "@/lib/util/api";

export async function getAccounts(role: UserRole.ADMIN | UserRole.EMPLOYEE) {
    const endpoint = role === UserRole.ADMIN 
    ? "/superadmin/management/users"
    : "/admin/management/users";

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include",
    });

    if(!response.ok) throw new Error("Cannot fetch accounts.");

    const result =await response.json();

    console.log("FETCHING ACCOUNTS:", role);

    if (!result || !result.data) return [];
    return result.data;
}