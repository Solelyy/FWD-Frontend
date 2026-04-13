import { useQuery } from "@tanstack/react-query"
import { getAttendanceApi } from "../api/getAttendanceApi"
import { AttendanceStatus } from "@/features/attendance/types/attendanceType"
export function useAttendance() {
    return useQuery({
        queryKey: ["attendance", ],
        queryFn: async () => {
            /*comment when running the backend
            if (process.env.NODE_ENV=="development") {
                return {
                    status: AttendanceStatus.COMPLETED,
                    canTimeIn: false,
                    isLate: true,
                    isUndertime: true,
                    timeIn: new Date().toISOString(),
                    timeOut: new Date().toISOString(),
                    timeInLocation: "Office - Quiapo",
                    timeOutLocation: null,
                    timeInImage: null,
                    timeOutImage: null,
                    overtimePending: false,
                };
        }*/
        return getAttendanceApi();
        },
        retry: 1, //retry api call once fails, so 2 try (initial + retry)
        refetchOnWindowFocus:false, //when user switch tab
        staleTime: 2 * 60 * 60 * 1000 //two hours
    })
}
