import { API_BASE_URL } from "@/lib/util/api";

import type { ReportsSummary } from "../types/reports";

export async function getReportsSummaryApi(month: number, year: number): Promise<ReportsSummary> {
    const response = await fetch(`${API_BASE_URL}/employee/reports/summary?month=${month}&year=${year}`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Unable to fetch reports summary.");
    }

    return response.json();
}
