import { ReimbursementRequests } from "../types/reimbursement"; 
import { mockReimbursementRequests } from "../mock-data/requests";
import { API_BASE_URL } from "@/lib/util/api";

/*
export async function reimbursementRequestsApi(): Promise<ReimbursementRequests> {
    return mockReimbursementRequests;
}*/

export async function reimbursementRequestsApi(): Promise<ReimbursementRequests> {
    const response = await fetch(`${API_BASE_URL}/employee/reimbursement-requests`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error ("Unable to fetch reimbursement requests.");
    }

    const result = await response.json();
    console.log("Reimbursement Requests: ", result);
    return result;
}