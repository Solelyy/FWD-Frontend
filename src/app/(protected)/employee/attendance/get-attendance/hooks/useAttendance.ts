import { useQuery } from "@tanstack/react-query"
import { getAttendanceApi } from "../api/getAttendanceApi"
import { AttendanceStatus, OvertimeStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType"
export function useAttendance() {
    return useQuery({
        queryKey: ["attendance", ],
        queryFn: () => {
            /*comment when running the backend
            if (process.env.NODE_ENV=="development") {
                return {
                    status: AttendanceStatus.COMPLETED,
                    canTimeIn: false,
                    isLate: true,
                    isUndertime: false,
                    timeIn: new Date().toISOString(),
                    timeOut: new Date().toISOString(),
                    timeInLocation: "Office - Quiapo",
                    timeOutLocation: null,
                    timeInImage: null,
                    timeOutImage: null,
                    overtimeStatus: OvertimeStatus.REJECTED
                };
        }*/
        return getAttendanceApi();
        },
        retry: 1, //retry api call once fails, so 2 try (initial + retry)
        refetchOnWindowFocus:false, //when user switch tab
        staleTime: 2 * 60 * 60 * 1000 //two hours
    })
}
