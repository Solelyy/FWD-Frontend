import { AddAccountFormValues } from "@/features/account-management/types/add-account";
import { API_BASE_URL } from "@/lib/util/api";
import { UserRole } from "@/lib/types/roles";

export async function createAccount(data: AddAccountFormValues, role: UserRole.ADMIN | UserRole.EMPLOYEE) {
    const endpoint = role === UserRole.ADMIN 
    ? "/users/create-admin-account"
    : "/users/create-employee-account"
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create account")
    }
    return response.json();
}