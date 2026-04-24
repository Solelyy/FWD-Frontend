import { API_BASE_URL } from "@/lib/util/api"

export async function leaveBalancesApi() {
    const endpoint = "/employee/leave-balances"

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error ("Unable to fetch leave balances.");
    }

    const result = await response.json();
    console.log("Leave balances: ", result);
    return result;
}