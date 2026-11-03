"use client";

import { useQuery } from "@tanstack/react-query";
import { getEmployeeTrendAnalysis } from "../api/trend-analysis.api";
import type { TrendAnalysisRequest } from "../types";

export function useEmployeeTrendAnalysis(
  request: TrendAnalysisRequest,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["employee-trend-analysis", request],
    queryFn: () => getEmployeeTrendAnalysis(request),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
