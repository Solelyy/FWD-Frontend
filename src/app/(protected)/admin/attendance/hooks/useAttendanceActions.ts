import { useMutation, useQueryClient } from "@tanstack/react-query";
import { overrideAttendanceApi, OverrideAttendancePayload } from "../api/overrideAttendanceApi";
import { toast } from "sonner";
import { markAbsentApi } from "../api/markAbsentApi";
import { addAttendanceApi } from "../api/addAttendanceApi";
import { UpdateOvertimeRequest, updateOvertimeRequestApi } from "../api/updateOvertimeRequestApi";

export function useAttendanceActions() {
    const queryClient = useQueryClient();
    const errorMsg = "Unable to do the action, please try again."

    const invalidateAttendanceQueries = () => {
        queryClient.invalidateQueries({ queryKey: ["attendance"] });
        queryClient.invalidateQueries({ queryKey: ["attendance-logs"], exact: false });
        queryClient.invalidateQueries({ queryKey: ["attendance-summary"], exact: false });
        queryClient.invalidateQueries({ queryKey: ["employees-attendance"], exact: false });
        queryClient.invalidateQueries({ queryKey: ["employees-attendance-stats"], exact: false });
    };

    const overrideAttendance = useMutation({
        mutationFn: (payload: OverrideAttendancePayload)=> 
            overrideAttendanceApi(payload),
        onSuccess: () => {
            toast.success("Attendance sucessfully changed.")
            invalidateAttendanceQueries()
        },
        onError: () => {
            toast.error(errorMsg)
        }
    });

    const markAbsent = useMutation({
        mutationFn: ({employeeId, status, id}: OverrideAttendancePayload)=> 
            markAbsentApi({id, employeeId, status}),
        onSuccess: () => {
            toast.success("Attendance sucessfully changed.")
            invalidateAttendanceQueries()
        },
        onError: () => {
            toast.error(errorMsg)
        }
    });

    const addAttendance = useMutation({
        mutationFn: (payload: OverrideAttendancePayload)=> 
            addAttendanceApi(payload),
        onSuccess: () => {
            toast.success("Attendance sucessfully changed.")
            invalidateAttendanceQueries()
        },
        onError: () => {
            toast.error(errorMsg)
        }
    });

    const updateOvertimeRequest = useMutation({
        mutationFn: ({employeeId, overtimeStatus, id}: UpdateOvertimeRequest)=> 
            updateOvertimeRequestApi({id, employeeId, overtimeStatus}),
        onSuccess: () => {
            toast.success("Attendance sucessfully changed.")
            invalidateAttendanceQueries()
        },
        onError: () => {
            toast.error(errorMsg)
        }
    });

    return {
        overrideAttendance,
        markAbsent,
        addAttendance,
        updateOvertimeRequest
    }
}