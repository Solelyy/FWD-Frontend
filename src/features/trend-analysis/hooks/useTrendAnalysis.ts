"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrendAnalysis } from "../api/trend-analysis.api";
import type { TrendAnalysisRequest } from "../types";

export function useTrendAnalysis(request: TrendAnalysisRequest, enabled: boolean) {
  return useQuery({
    queryKey: ["trend-analysis", request],
    queryFn: () => getTrendAnalysis(request),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
