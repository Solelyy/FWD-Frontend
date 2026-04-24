import { EmployeesSummaryResponse } from "../types/employees";
import { API_BASE_URL } from "@/lib/util/api";

export async function getEmployeesSummaryApi(): Promise<EmployeesSummaryResponse>{
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
