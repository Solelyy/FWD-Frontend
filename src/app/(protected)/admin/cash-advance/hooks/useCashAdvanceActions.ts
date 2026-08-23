import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCashAdvanceApi, UpdateCashAdvancePayload } from "../api/updateCashAdvanceApi";
import { toast } from "sonner";
import { CashAdvanceActionType } from "../types/ca-actions";
export function useCashAdvanceActions() {
    const queryClient = useQueryClient();
    const errorMsg = "Unable to do the action, please try again."

    return useMutation({
        mutationFn: (payload: UpdateCashAdvancePayload) => 
            updateCashAdvanceApi(payload),

        onSuccess: (_, { action}) => {
            toast.success(
                `Leave request ${action === CashAdvanceActionType.APPROVE ? "approved." : "rejected."}`
            );

            // Admin list
            queryClient.invalidateQueries({
                queryKey: ["employees-ca-requests"]
            });

            // Admin stats
            queryClient.invalidateQueries({
                queryKey: ["employees-ca-summary"]
            });

            // Employee side
            queryClient.invalidateQueries({
                queryKey: ["cash-advance-requests"]
            });
            
            queryClient.invalidateQueries({
                queryKey: ["cash-advance-summary"]
            });
        },

        onError: () => {
            toast.error(errorMsg)
        }
    })
}