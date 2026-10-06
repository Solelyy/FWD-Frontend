"use client";

import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendChart } from "./TrendChart";
import { TrendPeriodFilter } from "./TrendPeriodFilter";
import { useTrendAnalysis } from "../hooks/useTrendAnalysis";
import type { TrendPeriod } from "../types";

function monthDifference(start: string, end: string) {
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] = end.split("-").map(Number);
  return (endYear - startYear) * 12 + endMonth - startMonth;
}

export function TrendAnalysis() {
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7);
  const [period, setPeriod] = useState<TrendPeriod>("6");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const validationError = useMemo(() => {
    if (period !== "custom") return undefined;
    if (!startMonth || !endMonth) return "Choose both a starting and ending month.";
    if (startMonth > endMonth) return "The starting month must not be later than the ending month.";
    if (endMonth > currentMonth) return "Future months cannot be selected.";
    if (monthDifference(startMonth, endMonth) > 12) return "Custom periods cannot exceed one year.";
    return undefined;
  }, [currentMonth, endMonth, period, startMonth]);

  const request = useMemo(() => {
    const end = period === "custom" ? endMonth : currentMonth;
    const start = period === "custom" ? startMonth : (() => {
      const date = new Date(`${currentMonth}-01`);
      date.setMonth(date.getMonth() - Number(period) + 1);
      return date.toISOString().slice(0, 7);
    })();
    return { period, startMonth: start, endMonth: end };
  }, [currentMonth, endMonth, period, startMonth]);
  const query = useTrendAnalysis(request, !validationError);

  const retry = () => { void query.refetch(); };
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Understand workforce trends at a glance</CardTitle>
          <CardDescription>Trend Analysis turns monthly employee records into an easy-to-scan view of attendance, leave, reimbursement, and cash advance activity.</CardDescription>
        </CardHeader>
      </Card>
      <TrendPeriodFilter period={period} startMonth={startMonth} endMonth={endMonth} onPeriodChange={setPeriod} onRangeChange={(start, end) => { setStartMonth(start); setEndMonth(end); }} error={validationError} />
      {query.isLoading && <div className="grid gap-4 md:grid-cols-2"><Skeleton className="h-[350px]" /><Skeleton className="h-[350px]" /><Skeleton className="h-[350px]" /><Skeleton className="h-[350px]" /></div>}
      {query.isError && <Card><CardContent className="flex flex-col items-center gap-3 py-10 text-center"><p>We could not load trend analysis for this period.</p><Button variant="outline" onClick={retry}><RefreshCw className="mr-2 h-4 w-4" />Try again</Button></CardContent></Card>}
      {query.data?.status === "insufficient" && <Card><CardContent className="py-10 text-center"><p className="font-medium">Not enough data yet</p><p className="mt-1 text-sm text-muted-foreground">{query.data.message ?? "Trend analysis requires additional historical records."}</p></CardContent></Card>}
      {query.data?.status === "empty" && <Card><CardContent className="py-10 text-center"><p className="font-medium">No data available</p><p className="mt-1 text-sm text-muted-foreground">{query.data.message ?? "There are no records for the selected period."}</p></CardContent></Card>}
      {query.data?.status === "data" && (
        <div className="grid gap-4 md:grid-cols-2">
          <TrendChart title="Attendance" description="Monthly attendance rate" points={query.data.points} metrics={[{ key: "attendanceRate", label: "Attendance rate", color: "var(--chart-1)", suffix: "%" }]} />
          <TrendChart title="Attendance activity" description="Overtime, late, and absent occurrences" points={query.data.points} metrics={[{ key: "overtime", label: "Overtime", color: "var(--chart-2)" }, { key: "late", label: "Late", color: "var(--chart-3)" }, { key: "absent", label: "Absent", color: "var(--chart-4)" }]} />
          <TrendChart title="Leave" description="Monthly leave activity" points={query.data.points} metrics={[{ key: "leave", label: "Leave", color: "var(--chart-5)" }]} />
          <TrendChart title="Reimbursement" description="Monthly records and amount" points={query.data.points} metrics={[{ key: "reimbursementCount", label: "Records", color: "var(--chart-1)" }, { key: "reimbursementAmount", label: "Amount", color: "var(--chart-2)", currency: true }]} />
          <TrendChart title="Cash advance" description="Monthly records and amount" points={query.data.points} metrics={[{ key: "cashAdvanceCount", label: "Records", color: "var(--chart-3)" }, { key: "cashAdvanceAmount", label: "Amount", color: "var(--chart-4)", currency: true }]} />
        </div>
      )}
    </div>
  );
}
