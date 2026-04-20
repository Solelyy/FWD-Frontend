import { API_BASE_URL } from "@/lib/util/api";

export type SubmitCashAdvancePayload = {
    amountRequested: number;
    reason?: string
}

export async function submitCashAdvanceApi({amountRequested, reason}: SubmitCashAdvancePayload) {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({amountRequested, reason})
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error (result?.message || "Unable to submit cash advance request.");
    }

    console.log("Cash advance request response: ", result);

    return result;
}