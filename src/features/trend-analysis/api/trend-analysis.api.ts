import { API_BASE_URL } from "@/lib/util/api";
import { getMockTrendAnalysis } from "../mock-data/trend-analysis";
import type { TrendAnalysisRequest, TrendAnalysisResponse } from "../types";

export async function getTrendAnalysis(
  request: TrendAnalysisRequest,
): Promise<TrendAnalysisResponse> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    return getMockTrendAnalysis(request);
  }

  const query = new URLSearchParams({
    period: request.period,
    startMonth: request.startMonth,
    endMonth: request.endMonth,
  });
  const response = await fetch(`${API_BASE_URL}/admin/trend-analysis?${query}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch trend analysis.");
  }

  return response.json() as Promise<TrendAnalysisResponse>;
}
