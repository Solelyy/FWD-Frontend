import { API_BASE_URL } from "@/lib/util/api";

export type AdminDashboardSummaryResponse = {
    totalEmployees: number;
    presentToday: number;
    onLeave: number;
    pendingReimbursementRequest: number;
    pendingCashAdvanceRequest: number;
}

export type Props = {
    day: number;
    month: number;
    year: number
}

export async function adminDashboardSummaryApi({month, year, day} : Props): Promise<AdminDashboardSummaryResponse> {
    const endpoint =`month=${month+1}`;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error ("Unable to fetch admin summary for today.");
    }
    return response.json();
}