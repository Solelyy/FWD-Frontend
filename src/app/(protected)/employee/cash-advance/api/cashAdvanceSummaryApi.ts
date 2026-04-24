import { API_BASE_URL } from "@/lib/util/api";
import { CashAdvanceSummary } from "../types/cash-advance";
import { mockSummary } from "../mock-data/summary";

export async function cashAdvanceSummaryApi():Promise<CashAdvanceSummary> {
    return mockSummary;
}
/*
export async function cashAdvanceSummaryApi():Promise<CashAdvanceSummary> {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error ("Unable to fetch cash advance summary.");
    }

    const result = await response.json();
    console.log("CA Summary: ", result);
    return result;
}*/