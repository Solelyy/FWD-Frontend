import { API_BASE_URL } from "@/lib/util/api";
import { DashboardRequestsResponse } from "../types/requests";
import { mockRequests } from "../mock-data/requests";

type Props = {
    month: number,
    year: number
}

export async function getDashboardRequests({month, year}: Props): Promise<DashboardRequestsResponse>{
    const endpoint= `/employee/my-requests?year=${year}&month=${month+1}`;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: 'include'
    });

    const result = await response.json();
    console.log("Dashboard Requests: ", result ?? []);

    if (!response.ok) {
        throw new Error ("Unable to fetch dashboard requests.");
    }

    return result;
}

/*
export async function getDashboardRequests({month, year}: Props): Promise<DashboardRequestsResponse> {
    return mockRequests;
}*/