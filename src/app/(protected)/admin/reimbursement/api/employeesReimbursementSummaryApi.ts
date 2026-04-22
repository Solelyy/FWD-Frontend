import { API_BASE_URL } from "@/lib/util/api";
import { EmployeeReimbursementSummary } from "../types/reimbursement";

type Payload = {
    month: number,
    year: number
}

export async function employeesReimbursementSummaryApi({month, year}: Payload): Promise<EmployeeReimbursementSummary>{
    const endpoint = `/`;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error ("Cannot fetch reimbursement summary for this month.")
    }
    const result = await response.json();
    console.log("Fetched reimbursement summary: ", result);

    return result();
}