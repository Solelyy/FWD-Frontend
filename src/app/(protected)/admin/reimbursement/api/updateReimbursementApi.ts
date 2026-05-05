import { CashAdvanceActionType } from "../../cash-advance/types/ca-actions";
import { EmployeeReimbursementRequest } from "../types/reimbursement";
import { API_BASE_URL } from "@/lib/util/api";

export type UpdateReimbursementPayload = {
    id: EmployeeReimbursementRequest["id"]
    action: CashAdvanceActionType,
    approvedAmount?: number
}
export async function updateReimbursementApi({id, action, approvedAmount}: UpdateReimbursementPayload) {
    const endpoint = "/admin/employee/approve-reimbursement-request"

    const formattedText = action === CashAdvanceActionType.APPROVE ? "approve" : "reject";

    const formatPayload = action === CashAdvanceActionType.APPROVE ? "APPROVE" : "REJECT";

    const response = await fetch(`${API_BASE_URL}${endpoint}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id, status: formatPayload, approvedAmount }),
    },
    );

    const result= await response.json();

    console.log("updateReimbursementApi: ", result);

    if (!response.ok) {
        throw new Error(`Unable to ${formattedText} the reimbursement request.`);
    }

    return result;
}