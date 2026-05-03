import { API_BASE_URL } from "@/lib/util/api";
import { AdminDashboardSummaryResponse } from "../types/dashboard-summary";

export type Props = {
    day: number;
    month: number;
    year: number
}

export async function adminDashboardSummaryApi({month, year, day} : Props): Promise<AdminDashboardSummaryResponse> {
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