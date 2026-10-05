import { EmployeesSummaryResponse } from "../types/employees";
import { API_BASE_URL } from "@/lib/util/api";
import { mockEmployeesSummary } from "../mock-data/summary";

export async function getEmployeesSummaryApi(): Promise<EmployeesSummaryResponse>{
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        return mockEmployeesSummary;
    }

    const endpoint =  `/admin/management/employees`;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
    });
        
    if (!response.ok) throw new Error ("Cannot fetch employees accounts summary.");
        
    const result = await response.json();
    console.log("Fetch employees accs summary: ", result);
        
    return result;   
}
