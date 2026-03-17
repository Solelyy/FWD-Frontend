import { UpdateAccountVariables } from "../hooks/useAccountMutations";
import { AccountInfo, Status } from "../types/account";
import { API_BASE_URL } from "@/lib/util/api";

export async function updateAccountStatus({employeeId, newStatus} : UpdateAccountVariables) {
    const endpointsConfig: Partial<Record<Status, string>> ={
        [Status.ACTIVE]: "/superadmin/management/activate",
        [Status.INACTIVE]: "/superadmin/management/inactivate",
    };

    const endpoint = endpointsConfig[newStatus];

    const response = await fetch(
        `${API_BASE_URL}${endpoint}?/employeeId=${employeeId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus }),
    })

    if (!response.ok) {
        throw new Error("Failed to update account status.");
    }
    return response.json();
}
