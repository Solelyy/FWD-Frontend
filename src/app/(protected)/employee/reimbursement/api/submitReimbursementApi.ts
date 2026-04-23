import { API_BASE_URL } from "@/lib/util/api";
import { ReimbursementRequest, ReimbursementType } from "../types/reimbursement";

export type SubmitReimbursementPayload = {
    id?: ReimbursementRequest["id"];
    type: ReimbursementType;
    amountRequested: number;
    attachment?: string;
    reason?: string;
}

export async function submitReimbursementApi({id, type, amountRequested, attachment, reason}: SubmitReimbursementPayload) {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id, type, amountRequested, attachment, reason})
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error (result?.message || "Unable to submit reimbursement request.");
    }

    console.log("Reimbursement request response: ", result);

    return result;
}