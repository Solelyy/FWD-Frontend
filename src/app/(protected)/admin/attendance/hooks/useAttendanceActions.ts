import { useMutation, useQueryClient } from "@tanstack/react-query";
import { overrideAttendanceApi, OverrideAttendancePayload } from "../api/overrideAttendanceApi";
import { toast } from "sonner";
import { markAbsentApi } from "../api/markAbsentApi";
import { addAttendanceApi } from "../api/addAttendanceApi";
import { UpdateOvertimeRequest, updateOvertimeRequestApi } from "../api/updateOvertimeRequestApi";

export function useAttendanceActions() {
    const queryClient = useQueryClient();
    const errorMsg = "Unable to do the action, please try again."

    const overrideAttendance = useMutation({
        mutationFn: ({employeeId, status}: OverrideAttendancePayload)=> 
            overrideAttendanceApi({employeeId, status}),
        onSuccess: (_, {employeeId})=>{
            toast.success("Attendance sucessfully changed.")
            queryClient.invalidateQueries({
                queryKey: ["employees-attendance", employeeId],
                refetchType: "active"
            })
        },
        onError: () => {
            toast.error(errorMsg)
        }
    });

    const markAbsent = useMutation({
        mutationFn: ({employeeId, status}: OverrideAttendancePayload)=> 
            markAbsentApi({employeeId, status}),
        onSuccess: (_, {employeeId})=>{
            toast.success("Attendance sucessfully changed.")
            queryClient.invalidateQueries({
                queryKey: ["employees-attendance", employeeId],
                refetchType: "active"
            })
        },
        onError: () => {
            toast.error(errorMsg)
        }
    });

    const addAttendance = useMutation({
        mutationFn: ({employeeId, status}: OverrideAttendancePayload)=> 
            addAttendanceApi({employeeId, status}),
        onSuccess: (_, {employeeId})=>{
            toast.success("Attendance sucessfully changed.")
            queryClient.invalidateQueries({
                queryKey: ["employees-attendance", employeeId],
                refetchType: "active"
            })
        },
        onError: () => {
            toast.error(errorMsg)
        }
    });

    const updateOvertimeRequest = useMutation({
        mutationFn: ({employeeId, overtimeStatus}: UpdateOvertimeRequest)=> 
            updateOvertimeRequestApi({employeeId, overtimeStatus}),
        onSuccess: (_, {employeeId})=>{
            toast.success("Attendance sucessfully changed.")
            queryClient.invalidateQueries({
                queryKey: ["employees-attendance", employeeId],
                refetchType: "active"
            })
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