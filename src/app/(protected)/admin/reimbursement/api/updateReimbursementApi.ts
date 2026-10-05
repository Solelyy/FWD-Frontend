import { CashAdvanceActionType } from "../../cash-advance/types/ca-actions";
import { EmployeeReimbursementRequest } from "../types/reimbursement";
import { ReimbursementRequestStatus } from "@/app/(protected)/employee/reimbursement/types/reimbursement";
import { mockEmployeesReimbursementRequests } from "../mock-data/requests";
import { API_BASE_URL } from "@/lib/util/api";

export type UpdateReimbursementPayload = {
  id: EmployeeReimbursementRequest["id"];
  action: CashAdvanceActionType;
  approvedAmount?: number;
  adminReason?: string;
};
export async function updateReimbursementApi({
  id,
  action,
  approvedAmount,
  adminReason,
}: UpdateReimbursementPayload) {
  const endpoint = "/admin/employee/approve-reimbursement-request";

  const formattedText =
    action === CashAdvanceActionType.APPROVE ? "approve" : "reject";

  const formatPayload =
    action === CashAdvanceActionType.APPROVE ? "APPROVED" : "REJECTED";

  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    const request = mockEmployeesReimbursementRequests.find(
      (reimbursement) => reimbursement.id === id,
    );

    if (!request) {
      throw new Error(`Unable to find reimbursement request ${id}.`);
    }

    request.status =
      action === CashAdvanceActionType.APPROVE
        ? ReimbursementRequestStatus.APPROVED
        : ReimbursementRequestStatus.REJECTED;
    request.approvedAmount =
      action === CashAdvanceActionType.APPROVE
        ? (approvedAmount ?? request.requestedAmount)
        : 0;
    request.actionMade = {
      rejectionReason: action === CashAdvanceActionType.REJECT ? adminReason : undefined,
      timestamp: new Date().toISOString(),
    };

    return request;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      id,
      status: formatPayload,
      approvedAmount,
      adminReason,
    }),
  });

  const result = await response.json();

  console.log("updateReimbursementApi: ", result);

  if (!response.ok) {
    throw new Error(`Unable to ${formattedText} the reimbursement request.`);
  }

  return result;
}
