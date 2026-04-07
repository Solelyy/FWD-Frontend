import { AccountInfo } from "@/features/account-management/types/account";
import { API_BASE_URL } from "@/lib/util/api";

export async function acceptDataPolicyApi(employeeId: AccountInfo["employeeId"] | undefined) {
    const endpoint = "/"
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error;
    }
    return response.json();
}