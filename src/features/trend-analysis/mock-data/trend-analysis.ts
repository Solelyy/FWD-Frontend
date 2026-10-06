import type { TrendAnalysisResponse } from "../types";

import type { TrendAnalysisRequest } from "../types";

function createMockPoints(startMonth: string, endMonth: string) {
  const [startYear, startMonthNumber] = startMonth.split("-").map(Number);
  const [endYear, endMonthNumber] = endMonth.split("-").map(Number);
  const startIndex = startYear * 12 + startMonthNumber - 1;
  const endIndex = endYear * 12 + endMonthNumber - 1;
  const now = new Date();
  const points = [];

  for (let monthIndex = startIndex; monthIndex <= endIndex; monthIndex += 1) {
    const date = new Date(Math.floor(monthIndex / 12), monthIndex % 12, 1);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const index = monthIndex - startIndex;
    const monthLabel = date.toLocaleDateString("en-US", { month: "short" });

    points.push({
      month,
      label: monthLabel,
      isCurrentMonth: date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth(),
      attendanceRate: Number((90.5 + (index % 5) * 0.8).toFixed(1)),
      overtime: 30 + index * 2,
      late: Math.max(5, 18 - index),
      absent: Math.max(2, 8 - Math.floor(index / 2)),
      leave: 8 + (index % 6) * 2,
      reimbursementCount: 6 + (index % 7),
      reimbursementAmount: 17400 + index * 2800,
      cashAdvanceCount: 2 + (index % 4),
      cashAdvanceAmount: 7500 + index * 2100,
    });
  }

  return points;
}

export function getMockTrendAnalysis(
  request: TrendAnalysisRequest,
): TrendAnalysisResponse {
  const points = createMockPoints(request.startMonth, request.endMonth);

  return {
    status: points.length ? "data" : "empty",
    message: points.length ? undefined : "There are no records for the selected period.",
    points,
  };
}
