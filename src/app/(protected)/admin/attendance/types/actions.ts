import type { LucideIcon } from "lucide-react";
import { AccountInfo } from "@/features/account-management/types/account";
import { CalendarCheck2, SquarePen, CalendarX2, ClockCheck, TimerOff } from "lucide-react";
import { AttendanceStatus, OvertimeStatus } from "@/features/attendance/types/attendanceType";

export enum AttendanceActions {
    OVERRIDE_ATTENDANCE = "OVERRIDE_ATTENDANCE",
    APPROVE_OVERTIME = "APPROVE_OVERTIME",
    REJECT_OVERTIME= "REJECT_OVERTIME",
    ADD_ATTENDANCE = "ADD_ATTENDANCE",
    MARK_ABSENT = "MARK_ABSENT",
}

export type ActionPropsAttendance = {
    label: string;
    pendingLabel: string
    variant?: "destructive";
    targetAction: AttendanceActions;
    confirmTitle: string
    confirmMessage: string
    confirmActionMessage: string
    onClick?: (user: AccountInfo) => void;
    icon?: LucideIcon;
}

export const attendanceActionConfig: Record<AttendanceActions, ActionPropsAttendance> = {
    [AttendanceActions.ADD_ATTENDANCE] : {
        label: "Add Attendance",
        pendingLabel: "Adding Attendance...",
        targetAction: AttendanceActions.ADD_ATTENDANCE,
        confirmTitle: "Add Attendance",
        confirmMessage: "Are you sure you want to add the attendance of this employee?",
        confirmActionMessage: "Confirm Attendance",
        icon: CalendarCheck2
    },

    [AttendanceActions.OVERRIDE_ATTENDANCE] : {
        label: "Override Attendance",
        pendingLabel: "Overriding Attendance...",
        variant: "destructive",
        targetAction: AttendanceActions.OVERRIDE_ATTENDANCE,
        confirmTitle: "Override Attendance",
        confirmMessage: "Are you sure you want to change the attendance of this employee?",
        confirmActionMessage: "Confirm Attendance",
        icon: SquarePen
    },

    [AttendanceActions.MARK_ABSENT] : {
        label: "Mark Absent",
        pendingLabel: "Marking Absent...",
        variant: "destructive",
        targetAction: AttendanceActions.MARK_ABSENT,
        confirmTitle: "Mark Absent",
        confirmMessage: "Are you sure you want this employee absent?",
        confirmActionMessage: "Confirm Attendance",
        icon: CalendarX2
    },

    [AttendanceActions.APPROVE_OVERTIME] : {
        label: "Approve Overtime",
        pendingLabel: "Approving Overtime...",
        targetAction: AttendanceActions.APPROVE_OVERTIME,
        confirmTitle: "Approve Overtime",
        confirmMessage: "Are you sure you want to approve the overtime?",
        confirmActionMessage: "Confirm Overtime",
        icon: ClockCheck
    },

    [AttendanceActions.REJECT_OVERTIME] : {
        label: "Reject Overtime",
        pendingLabel: "Rejecting Overtime...",
        variant: "destructive",
        targetAction: AttendanceActions.REJECT_OVERTIME,
        confirmTitle: "Reject Overtime",
        confirmMessage: "Are you sure you want to reject the overtime?",
        confirmActionMessage: "Confirm Rejection",
        icon: TimerOff
    },
}

export type AttendanceCombinedStatus =
  | "NO_RECORD"
  | "IN_PROGRESS"
  | "MISSING_TIMEOUT"
  | "COMPLETED"
  | "COMPLETED_OT_PENDING"
  | "COMPLETED_OT_APPROVED"
  | "COMPLETED_OT_REJECTED"
  | "ON_LEAVE"
  | "SUSPENDED";

export function getCombinedStatus(status: AttendanceStatus, overtimeStatus?: OvertimeStatus) :
AttendanceCombinedStatus {
  if (overtimeStatus === "PENDING") return "COMPLETED_OT_PENDING";

    if (status === "COMPLETED") {
        if (!overtimeStatus) return "COMPLETED"
        if (overtimeStatus === "APPROVED") return "COMPLETED_OT_APPROVED";
        if (overtimeStatus === "REJECTED") return "COMPLETED_OT_REJECTED";
    }
  return status;
}

export const statusActions: Record<AttendanceCombinedStatus,AttendanceActions[]> = {
  NO_RECORD: [
    AttendanceActions.ADD_ATTENDANCE,
    AttendanceActions.MARK_ABSENT,
  ],

  IN_PROGRESS: [
    AttendanceActions.OVERRIDE_ATTENDANCE,
    AttendanceActions.MARK_ABSENT
  ],

  MISSING_TIMEOUT: [
    AttendanceActions.OVERRIDE_ATTENDANCE,
    AttendanceActions.MARK_ABSENT
  ],

  COMPLETED: [
    AttendanceActions.OVERRIDE_ATTENDANCE,
    AttendanceActions.MARK_ABSENT
  ],

  COMPLETED_OT_PENDING: [
    AttendanceActions.APPROVE_OVERTIME,
    AttendanceActions.REJECT_OVERTIME,
    AttendanceActions.OVERRIDE_ATTENDANCE,
    AttendanceActions.MARK_ABSENT
  ],

  COMPLETED_OT_APPROVED: [
    AttendanceActions.OVERRIDE_ATTENDANCE,
    AttendanceActions.MARK_ABSENT
  ],

  COMPLETED_OT_REJECTED: [
    AttendanceActions.OVERRIDE_ATTENDANCE,
    AttendanceActions.MARK_ABSENT
  ],

  ON_LEAVE: [
  ],

  SUSPENDED: [
  ],
};

export function getAttendanceActionByStatus(
    status: AttendanceStatus, overtimeStatus?: OvertimeStatus
) : ActionPropsAttendance[]{
    const combined = getCombinedStatus(status, overtimeStatus);

    return statusActions[combined].map(
        action => attendanceActionConfig[action]
    );
}