import { CashAdvanceActionType } from "../types/ca-actions";
import { EmployeeCARequest } from "../types/cash-advance";
import { API_BASE_URL } from "@/lib/util/api";

export type UpdateCashAdvancePayload = {
    id: EmployeeCARequest["id"],
    action: CashAdvanceActionType,
    approvedAmount?: number
}
export async function updateCashAdvanceApi({id, action, approvedAmount}: UpdateCashAdvancePayload) {
    const endpoint = "/admin/employee/approve-request"

    const formattedText = action === CashAdvanceActionType.APPROVE ? "approve" : "reject";

    const formatPayload = action === CashAdvanceActionType.APPROVE ? "APPROVED" : "REJECTED";
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({status:formatPayload, id, approvedAmount }),
    },
    );

    const result= await response.json();

    console.log("updateCashAdvanceApi: ", result);

    if (!response.ok) {
        throw new Error(`Unable to ${formattedText} the cash advance request.`);
    }

    return result;
}