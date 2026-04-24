import { ReimbursementRequests } from "../types/reimbursement"; 
import { mockReimbursementRequests } from "../mock-data/requests";

export async function reimbursementRequestsApi(): Promise<ReimbursementRequests> {
    return mockReimbursementRequests;
}

/*
export async function reimbursementRequestsApi(): Promise<ReimbursementRequests> {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error ("Unable to fetch reimbursement requests.");
    }

    const result = await response.json();
    console.log("CA Requests: ", result);
    return result;
}*/