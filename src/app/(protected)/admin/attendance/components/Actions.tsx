"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { EmployeeAttendance } from "../types/attendance-types";
import { ActionPropsAttendance, AttendanceActions, getAttendanceActionByStatus } from "../types/actions";
import { useState } from "react";
import { useAttendanceActions } from "../hooks/useAttendanceActions";
import AttendanceActionDialog from "./AttendanceActionDialog";
import { OvertimeStatus } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";

type Props = {
  attendanceLog: EmployeeAttendance
}
export default function Actions({attendanceLog}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ActionPropsAttendance | null>(null);
  const actions = getAttendanceActionByStatus(attendanceLog?.status, attendanceLog?.overtimeStatus);

  function handleAction(action: ActionPropsAttendance) {
    setSelectedAction(action);
    setOpen(true);
    console.log(action.targetAction, attendanceLog);
  }

  const handleConfirm = async (
    attendanceLog: EmployeeAttendance,
    action: ActionPropsAttendance,
    extra?: { timeIn?: Date; timeOut?: Date }
    ) => {
      if (isPending) return;

      const timeIn = extra?.timeIn?.toISOString();
      const timeOut = extra?.timeOut?.toISOString();

      const actionHandlers = {
        [AttendanceActions.ADD_ATTENDANCE]: () => 
          addAttendance.mutateAsync({
            employeeId: attendanceLog.employeeId,
            status: attendanceLog.status,
            timeIn,
            timeOut,
          }
        ),

        [AttendanceActions.MARK_ABSENT]: () => 
          markAbsent.mutateAsync({
            employeeId: attendanceLog.employeeId,
            status: attendanceLog.status
          }
        ),

        [AttendanceActions.OVERRIDE_ATTENDANCE]: () => 
          overrideAttendance.mutateAsync({
            employeeId: attendanceLog.employeeId,
            status: attendanceLog.status,
            timeIn,
            timeOut,
          }
        ),

        [AttendanceActions.APPROVE_OVERTIME]: () => 
          updateOvertimeRequest.mutateAsync({
            employeeId: attendanceLog.employeeId,
            overtimeStatus: OvertimeStatus.APPROVED
          }
        ),

        [AttendanceActions.REJECT_OVERTIME]: () => 
          updateOvertimeRequest.mutateAsync({
            employeeId: attendanceLog.employeeId,
            overtimeStatus: OvertimeStatus.REJECTED
          }
        ),
      };

      await actionHandlers[action.targetAction]?.();
      setOpen(false);
    }

  const {overrideAttendance, markAbsent, addAttendance, updateOvertimeRequest} = useAttendanceActions();
    
  const isPending = 
    overrideAttendance.isPending || markAbsent.isPending || addAttendance.isPending || updateOvertimeRequest.isPending;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontalIcon />
            <span className="sr-only">Open Menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {actions.map((action, idx) => {
            const Icon = action.icon;

            return (
            <div key={action.targetAction}>
              <DropdownMenuItem
                onClick={() => handleAction(action)}
                className={`
                  ${action.variant === "destructive"
                    ? "text-red-500 focus:text-red-500 focus:bg-red-100 dark:focus:bg-red-200"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {Icon && (
                    <Icon className={`w-4 h-4 ${action.variant === "destructive"
                    ? "text-red-500"
                    : ""}`}
                  />
                  )}             
                  <span>{action.label}</span>
                </div>
              </DropdownMenuItem>
              {idx !== actions.length - 1 && <DropdownMenuSeparator />}
            </div>
          )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <AttendanceActionDialog
        open={open}
        setOpen={setOpen}
        attendanceLog= {attendanceLog}
        action={selectedAction}
        onConfirm={handleConfirm}
        isPending={isPending}
      />
    </>
  )
}