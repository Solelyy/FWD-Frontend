import { CashAdvanceRequests } from "../types/cash-advance";
import { mockCashAdvanceRequests } from "../mock-data/requests";
import { API_BASE_URL } from "@/lib/util/api";

/*
export async function cashAdvanceRequestsApi(): Promise<CashAdvanceRequests> {
    return mockCashAdvanceRequests;
}*/

export async function cashAdvanceRequestsApi(): Promise<CashAdvanceRequests> {
    const endpoint = "/employee/cash-advance-requests"
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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