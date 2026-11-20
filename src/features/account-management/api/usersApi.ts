import { UserRole } from "@/lib/types/roles";
import {
    mockAdminAccounts,
    mockEmployeeAccounts,
} from "../mock-data/accounts";

export async function getAccounts(role: UserRole.ADMIN | UserRole.EMPLOYEE) {
    if (
        process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" &&
        (role === UserRole.EMPLOYEE || role === UserRole.ADMIN)
    ) {
        return role === UserRole.EMPLOYEE
            ? mockEmployeeAccounts
            : mockAdminAccounts;
    }

    const endpoint = role === UserRole.ADMIN 
    ? "/api/superadmin/management/users"
    : "/api/admin/management/users";

    const response = await fetch(`${endpoint}`, {
        method: "GET",
        credentials: "include",
    });

    if(!response.ok) throw new Error("Cannot fetch accounts.");

    const result =await response.json();

    console.log("FETCHING ACCOUNTS:", role);

    if (!result || !result.data) return [];
    return result.data;
}