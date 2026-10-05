import {
  AttendanceStatus,
  AttendanceSummaryResponse,
  AttendanceStatusResponse,
  AttendanceLogsResponse,
} from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";

export const mockAttendanceStatus: AttendanceStatusResponse = {
  status: AttendanceStatus.COMPLETED,
  canTimeIn: false,
  isLate: false,
  isUndertime: false,
  timeIn: "2026-04-20T08:30:00.000Z",
  timeOut: "2026-04-20T17:30:00.000Z",
  timeInLocation: "Manila HQ",
  timeOutLocation: "Manila HQ",
  timeInImage: "/assets/mock/timein-1.jpg",
  timeOutImage: "/assets/mock/timeout-1.jpg",
  isChanged: false,
  changes: {
    adminFirstname: "",
    adminLastname: "",
    timestamp: "",
    reason: "",
  },
};

export const mockAttendanceSummary: AttendanceSummaryResponse = {
  totalLogs: 20,
  totalWorkedHours: 160,
  presentDays: 20,
  accumulatedOvertime: 8,
};

export const mockAttendanceLogs: AttendanceLogsResponse = {
  logs: [
    {
      id: "ATT-1001",
      employeeId: "EMP-1001",
      date: "2026-04-20",
      timeIn: { timestamp: "2026-04-20T08:30:00.000Z" },
      timeOut: { timestamp: "2026-04-20T17:30:00.000Z" },
      status: AttendanceStatus.COMPLETED,
      totalHours: 8,
    },
  ],
  meta: {
    page: 1,
    limit: 10,
    total: 1,
  },
};
