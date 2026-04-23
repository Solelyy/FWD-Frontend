import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateReimbursementPayload, updateReimbursementApi } from "../api/updateReimbursementApi";
import { toast } from "sonner";
import { CashAdvanceActionType } from "../../cash-advance/types/ca-actions";

export function useReimbursementActions() {
    const queryClient = useQueryClient();
    const errorMsg = "Unable to do the action, please try again."

    return useMutation({
        mutationFn: (payload: UpdateReimbursementPayload) => 
            updateReimbursementApi(payload),

        onSuccess: (_, { action}) => {
            toast.success(
                `Reimbursement request ${action === CashAdvanceActionType.APPROVE ? "approved." : "rejected."}`
            );

            // Admin list
            queryClient.invalidateQueries({
                queryKey: ["employees-reimbursement-requests"]
            });

            // Admin stats
            queryClient.invalidateQueries({
                queryKey: ["employees-reimbursement-summary"]
            });

            // Employee side
            queryClient.invalidateQueries({
                queryKey: ["reimbursement-requests"]
            });
            
            queryClient.invalidateQueries({
                queryKey: ["reimbursement-summary"]
            });
        },

        onError: () => {
            toast.error(errorMsg)
        }
    })
}