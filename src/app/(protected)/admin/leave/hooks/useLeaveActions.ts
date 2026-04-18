import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLeaveStatusApi, UpdateLeaveStatusPayload } from "../api/updateLeaveStatusApi";
import { toast } from "sonner";
import { LeaveActionType } from "../types/leave-actions";

export function useLeaveActions() {
    const queryClient = useQueryClient();
    const errorMsg = "Unable to do the action, please try again."

    return useMutation({
        mutationFn: (payload: UpdateLeaveStatusPayload) => 
            updateLeaveStatusApi(payload),

        onSuccess: (_, { leaveAction }) => {
            toast.success(
                `Leave request ${leaveAction === LeaveActionType.APPROVE ? "approved." : "rejected."}`
            );

            // Admin list
            queryClient.invalidateQueries({
                queryKey: ["employees-leave-requests"]
            });

            // Admin stats
            queryClient.invalidateQueries({
                queryKey: ["leave-requests-stats"]
            });

            // Employee side
            queryClient.invalidateQueries({
                queryKey: ["leave-requests"]
            });
        },

        onError: () => {
            toast.error(errorMsg)
        }
    })
}