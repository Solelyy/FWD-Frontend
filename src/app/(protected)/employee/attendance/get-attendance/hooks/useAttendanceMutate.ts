import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceSubmitApi } from "@/app/(protected)/employee/attendance/submit-attendance/api/attendanceSubmitApi";

export function useAttendanceMutation(month:number, year: number, day:number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: attendanceSubmitApi,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["attendance"]});
            queryClient.invalidateQueries({queryKey:["attendance-logs", year, month],
                exact:false
            });
            queryClient.invalidateQueries({queryKey:["attendance-summary", year, month]});
            queryClient.invalidateQueries({queryKey: ["employees-attendance", 
                {year, month, day}
            ],
                exact: false
            })
        }
    });
}