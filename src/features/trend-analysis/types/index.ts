export type TrendPeriod = "3" | "6" | "12" | "custom";

export type TrendAnalysisRequest = {
  period: Exclude<TrendPeriod, "custom"> | "custom";
  startMonth: string;
  endMonth: string;
};

export type TrendPoint = {
  month: string;
  label: string;
  isCurrentMonth?: boolean;
  attendanceRate?: number | null;
  overtime?: number | null;
  late?: number | null;
  absent?: number | null;
  leave?: number | null;
  reimbursementCount?: number | null;
  reimbursementAmount?: number | null;
  cashAdvanceCount?: number | null;
  cashAdvanceAmount?: number | null;
};

export type TrendAnalysisResponse = {
  status: "data" | "empty" | "insufficient";
  message?: string;
  points: TrendPoint[];
};
