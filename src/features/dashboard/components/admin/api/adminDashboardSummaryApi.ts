import { API_BASE_URL } from "@/lib/util/api";
import { AdminDashboardSummaryResponse } from "../types/dashboard-summary";
import { mockAdminDashboardSummary } from "../mock-data/summary";

export type Props = {
    day: number;
    month: number;
    year: number
}

export async function adminDashboardSummaryApi({month, year, day} : Props): Promise<AdminDashboardSummaryResponse> {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        return mockAdminDashboardSummary;
    }

    const endpoint =`/admin/management/get-employee-data`;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error ("Unable to fetch admin summary for today.");
    }
    return response.json();
}