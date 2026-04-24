import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitLeaveRequestApi } from "../api/submitLeaveRequestApi";

export function useLeaveMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: submitLeaveRequestApi,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["leave-requests"]})
            queryClient.invalidateQueries({
                queryKey: ["employees-leave-requests"]
            });

            // Admin stats
            queryClient.invalidateQueries({
                queryKey: ["leave-requests-stats"]
            });

            //Admin leave balances record
            queryClient.invalidateQueries({
                queryKey: ["employees-leave-balances"]
            });

            // Employee side
            queryClient.invalidateQueries({
                queryKey: ["leave-requests"]
            });

            queryClient.invalidateQueries({
                queryKey: ["leave-balances"]
            });
        }
    })
}