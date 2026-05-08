import { API_BASE_URL } from "@/lib/util/api";
import { ReimbursementRequest, ReimbursementType } from "../types/reimbursement";

export type SubmitReimbursementPayload = {
    id?: ReimbursementRequest["id"];
    type: ReimbursementType;
    amountRequested: number;
    attachment?: File | null;
    reason?: string;
}

export async function submitReimbursementApi({id, type, amountRequested, attachment, reason}: SubmitReimbursementPayload) {
    const formData = new FormData();

    formData.append("type", type);
    formData.append("amountRequested", amountRequested.toString());
    if (reason) {
        formData.append("reason", reason)
    }
    if (attachment) {
        formData.append("attachment", attachment)
    }

    const response = await fetch(`${API_BASE_URL}/employee/reimbursement-request`, {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error (result?.message || "Unable to submit reimbursement request.");
    }

    console.log("Reimbursement request response: ", result);

    return result;
}