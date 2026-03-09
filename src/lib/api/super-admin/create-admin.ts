import { AddAdminFormValues } from "@/lib/types/create-admin";

export async function createAdmin(data: AddAdminFormValues) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/create-admin-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create admin")
    }
    return response.json();
}