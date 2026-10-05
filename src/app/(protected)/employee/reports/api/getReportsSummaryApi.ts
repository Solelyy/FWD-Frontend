import { API_BASE_URL } from "@/lib/util/api";

import type { ReportsSummary } from "../types/reports";
import { mockReportsSummary } from "../mock-data/summary";

export async function getReportsSummaryApi(month: number, year: number): Promise<ReportsSummary> {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        return mockReportsSummary;
    }

    const response = await fetch(`${API_BASE_URL}/employee/reports/summary?month=${month}&year=${year}`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Unable to fetch reports summary.");
    }

    const result = await response.json();
    console.log("Reports Summary: ", result);
    return result;
}
