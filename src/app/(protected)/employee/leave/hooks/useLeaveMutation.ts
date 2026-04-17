import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitLeaveRequestApi } from "../api/submitLeaveRequestApi";

export function useLeaveMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: submitLeaveRequestApi,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["leave-requests"]})
        }
    })
}