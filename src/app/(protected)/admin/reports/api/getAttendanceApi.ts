import { EmployeeAttendances } from "../types/attendance";
import { mockEmployeeAttendances } from "../mock-data/attendance";

export type AttendancePayload = {
  month: number;
  year: number;
  cutoff: string;
  page: number;
  limit: number;
};
export async function getAttendanceApi({
  month,
  year,
  cutoff,
  page,
  limit,
}: AttendancePayload): Promise<EmployeeAttendances> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    const start = (page - 1) * limit;
    return {
      ...mockEmployeeAttendances,
      records: mockEmployeeAttendances.records.slice(start, start + limit),
      meta: {
        page,
        limit,
        total: mockEmployeeAttendances.records.length,
      },
    };
  }

  const endpoint = `/api/admin/attendance?month=${month + 1}&year=${year}&cutoff=${cutoff}&page=${page}&limit=${limit}`;
  const response = await fetch(`${endpoint}`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Unable to fetch employees attendance report.",
    );
  }

  return result;
}
