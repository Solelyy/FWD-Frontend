import { CashAdvanceActionType } from "../types/ca-actions";
import { EmployeeCARequest } from "../types/cash-advance";

export type UpdateCashAdvancePayload = {
  id: EmployeeCARequest["id"];
  action: CashAdvanceActionType;
  approvedAmount?: number;
  adminReason?: string;
};
export async function updateCashAdvanceApi({
  id,
  action,
  approvedAmount,
  adminReason,
}: UpdateCashAdvancePayload) {
  const endpoint = "/api/admin/employee/approve-request";

  const formattedText =
    action === CashAdvanceActionType.APPROVE ? "approve" : "reject";

  const formatPayload =
    action === CashAdvanceActionType.APPROVE ? "APPROVED" : "REJECTED";

  const response = await fetch(`${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      status: formatPayload,
      id,
      approvedAmount,
      adminReason,
    }),
  });

  const result = await response.json();

  console.log("updateCashAdvanceApi: ", result);

  if (!response.ok) {
    throw new Error(`Unable to ${formattedText} the cash advance request.`);
  }

  return result;
}
