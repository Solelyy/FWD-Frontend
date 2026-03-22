import { AccountInfo, Status } from "../types/account";
import { API_BASE_URL } from "@/lib/util/api";

export type SuspendAccountPayload = {
    employeeId: AccountInfo["employeeId"];
    status: Status
    startDate: string
    endDate: string
}
 
export async function suspendAccountApi({employeeId, status, startDate, endDate}: SuspendAccountPayload){
    const response = await fetch(`${API_BASE_URL}/superadmin/management/employment?employeeId=${employeeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({status, startDate, endDate}),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to suspend account.");
    }    
    const result = await response.json();
    console.log(`Employee ID: ${employeeId}\nStatus: ${status}\nStart Date: ${startDate}\nEnd Date: ${endDate}`)

    console.log(`Result: ${result}`);
    return result; 
}