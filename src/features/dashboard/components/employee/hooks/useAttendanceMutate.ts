import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceSubmitApi } from "@/features/attendance/api/attendanceSubmitApi";

export function useAttendanceMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: attendanceSubmitApi,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["attendance"]})
        }
    });
}