import { CashAdvanceActionType } from "../types/ca-actions";
import { EmployeeCARequest } from "../types/cash-advance";
import { API_BASE_URL } from "@/lib/util/api";

export type UpdateCashAdvancePayload = {
    employeeId: EmployeeCARequest["employeeId"],
    action: CashAdvanceActionType,
    approvedAmount?: number
}
export async function updateCashAdvanceApi({employeeId, action, approvedAmount}: UpdateCashAdvancePayload) {
    const endpoint = action === CashAdvanceActionType.APPROVE
    ? "/"
    : "/";

    const formattedText = action === CashAdvanceActionType.APPROVE ? "approve" : "reject";

    const response = await fetch(`${API_BASE_URL}${endpoint}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ employeeId, approvedAmount }),
    },
    );

    const result= await response.json();

    console.log("updateCashAdvanceApi: ", result);

    if (!response.ok) {
        throw new Error(`Unable to ${formattedText} the cash advance request.`);
    }

    return result;
}