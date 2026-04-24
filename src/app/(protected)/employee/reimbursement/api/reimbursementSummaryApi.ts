import { API_BASE_URL } from "@/lib/util/api";
import { ReimbursementSummary } from "../types/reimbursement";
import { mockSummary } from "../mock-data/summary";

export async function reimbursementSummaryApi():Promise<ReimbursementSummary> {
    return mockSummary;
}
/*
export async function reimbursementSummaryApi():Promise<ReimbursementSummary> {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error ("Unable to fetch reimbursement summary.");
    }

    const result = await response.json();
    console.log("Reimbursement Summary: ", result);
    return result;
}*/