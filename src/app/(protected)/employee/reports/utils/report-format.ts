import { leaveTypeFormatText } from "@/app/(protected)/employee/leave/types/leave";

const statusLabels: Record<string, string> = {
  APPROVED: "Approved",
  ABSENT: "Absent",
  COMPLETED: "Present",
  IN_PROGRESS: "Clocked In",
  MISSING_TIMEOUT: "Missing Timeout",
  NO_RECORD: "No Attendance",
  ON_LEAVE: "On Leave",
  PENDING: "Pending",
  PRESENT: "Present",
  REJECTED: "Rejected",
  RELEASED: "Released",
  SUSPENDED: "Suspended",
};

export function formatReportLeaveType(
  value: string | number | null,
): string | number | null {
  if (typeof value !== "string") {
    return value;
  }

  return (
    leaveTypeFormatText[value as keyof typeof leaveTypeFormatText] ??
    value
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function formatReportStatus(
  value: string | number | null,
): string | number | null {
  if (typeof value !== "string") {
    return value;
  }

  return (
    statusLabels[value] ??
    value
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function normalizeReportRows(
  rows: Array<Record<string, string | number | null>>,
) {
  return rows.map((row) =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        key,
        key.toLowerCase().includes("status")
          ? formatReportStatus(value)
          : key.toLowerCase().includes("leave type")
            ? formatReportLeaveType(value)
          : value,
      ]),
    ),
  );
}
