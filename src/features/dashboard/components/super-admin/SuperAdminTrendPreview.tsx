"use client";

import { useMemo } from "react";
import { TrendChart } from "@/features/trend-analysis/components/TrendChart";
import { useTrendAnalysis } from "@/features/trend-analysis/hooks/useTrendAnalysis";
import type { TrendAnalysisRequest } from "@/features/trend-analysis/types";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function getTrendRequest(): TrendAnalysisRequest {
    const endMonth = new Date().toISOString().slice(0, 7);
    const startDate = new Date(`${endMonth}-01`);
    startDate.setMonth(startDate.getMonth() - 5);

    return {
        period: "6",
        startMonth: startDate.toISOString().slice(0, 7),
        endMonth,
    };
}

export default function SuperAdminTrendPreview() {
    const request = useMemo(() => getTrendRequest(), []);
    const { data, isLoading, isError } = useTrendAnalysis(request, true);

    if (isLoading) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <Skeleton className="h-5 w-44" />
                    <Skeleton className="mt-2 h-4 w-72 max-w-full" />
                    <Skeleton className="mt-6 h-[190px] w-full" />
                </CardContent>
            </Card>
        );
    }

    if (isError || data?.status !== "data") {
        return (
            <Card>
                <CardContent className="flex min-h-[270px] items-center justify-center py-8 text-center">
                    <div>
                        <p className="font-medium">Trend Analysis</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Trend data will appear here when enough records are available.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid gap-4 lg:grid-cols-2">
            <TrendChart
                compact
                title="Attendance rate"
                description="Monthly attendance across the last six months"
                points={data.points}
                metrics={[{
                    key: "attendanceRate",
                    label: "Attendance rate",
                    color: "var(--chart-1)",
                    suffix: "%",
                }]}
            />
            <TrendChart
                compact
                title="Attendance activity"
                description="Overtime, late, and absent occurrences"
                points={data.points}
                metrics={[
                    { key: "overtime", label: "Overtime", color: "var(--chart-2)" },
                    { key: "late", label: "Late", color: "var(--chart-3)" },
                    { key: "absent", label: "Absent", color: "var(--chart-4)" },
                ]}
            />
        </div>
    );
}
