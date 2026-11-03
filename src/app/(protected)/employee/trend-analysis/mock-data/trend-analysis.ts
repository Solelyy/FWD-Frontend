import type {
  TrendAnalysisRequest,
  TrendAnalysisResponse,
  TrendPoint,
} from "../types";

function createMockPoints(startMonth: string, endMonth: string): TrendPoint[] {
  const [startYear, startMonthNumber] = startMonth.split("-").map(Number);
  const [endYear, endMonthNumber] = endMonth.split("-").map(Number);
  const startIndex = startYear * 12 + startMonthNumber - 1;
  const endIndex = endYear * 12 + endMonthNumber - 1;
  const now = new Date();
  const points: TrendPoint[] = [];

  for (let monthIndex = startIndex; monthIndex <= endIndex; monthIndex += 1) {
    const date = new Date(Math.floor(monthIndex / 12), monthIndex % 12, 1);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const index = monthIndex - startIndex;

    points.push({
      month,
      label: date.toLocaleDateString("en-US", { month: "short" }),
      isCurrentMonth:
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth(),
      attendanceRate: Number((92 + (index % 4) * 0.6).toFixed(1)),
      overtime: 2 + (index % 3),
      late: Math.max(0, 3 - Math.floor(index / 3)),
      absent: index === 2 ? 1 : 0,
      leave: 1 + (index % 3),
      reimbursementCount: index % 3,
      reimbursementAmount: 1200 + index * 450,
      cashAdvanceCount: index % 2,
      cashAdvanceAmount: index % 2 ? 2500 : 0,
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
    message: points.length
      ? undefined
      : "There are no records for the selected period.",
    points,
  };
}
