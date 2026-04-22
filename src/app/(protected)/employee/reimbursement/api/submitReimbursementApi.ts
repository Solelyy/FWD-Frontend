import { API_BASE_URL } from "@/lib/util/api";
import { ReimbursementRequest } from "../types/reimbursement";

export type SubmitReimbursementPayload = {
    id: ReimbursementRequest["id"]
}

export async function submitReimbursementApi({id}: SubmitReimbursementPayload) {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id})
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error (result?.message || "Unable to submit reimbursement request.");
    }

    console.log("Reimbursement request response: ", result);

    return result;
}