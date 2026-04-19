import { API_BASE_URL } from "@/lib/util/api";
import { CashAdvanceRequests } from "../types/cash-advance";

export async function cashAdvanceRequestsApi(): Promise<CashAdvanceRequests> {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error ("Unable to fetch cash advance requests.");
    }

    const result = await response.json();
    console.log("CA Requests: ", result);
    return result;
}