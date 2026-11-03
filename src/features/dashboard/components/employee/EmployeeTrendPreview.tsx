"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendChart } from "@/features/trend-analysis/components/TrendChart";
import { useEmployeeTrendAnalysis } from "@/app/(protected)/employee/trend-analysis/hooks/useTrendAnalysis";
import type { TrendAnalysisRequest } from "@/features/trend-analysis/types";

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

export default function EmployeeTrendPreview() {
    const request = useMemo(() => getTrendRequest(), []);
    const { data, isLoading, isError } = useEmployeeTrendAnalysis(request, true);

    if (isLoading) {
        return (
            <div className="grid gap-4 lg:grid-cols-2">
                <Skeleton className="h-[270px]" />
                <Skeleton className="h-[270px]" />
            </div>
        );
    }

    if (isError || data?.status !== "data") {
        return (
            <Card>
                <CardContent className="flex min-h-[270px] items-center justify-center py-8 text-center">
                    <div>
                        <p className="font-medium">Trend Analysis</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Your trend data will appear here when enough records are available.
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
                description="Your monthly attendance rate"
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
                description="Your overtime, late, and absent occurrences"
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
