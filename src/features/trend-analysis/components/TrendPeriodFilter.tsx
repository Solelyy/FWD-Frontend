"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import type { TrendPeriod } from "../types";

type Props = {
  period: TrendPeriod;
  startMonth: string;
  endMonth: string;
  onPeriodChange: (period: TrendPeriod) => void;
  onRangeChange: (startMonth: string, endMonth: string) => void;
  error?: string;
};

export function TrendPeriodFilter({ period, startMonth, endMonth, onPeriodChange, onRangeChange, error }: Props) {
  const currentDate = useMemo(() => new Date(), []);
  const currentYear = currentDate.getFullYear();
  const currentMonthNumber = currentDate.getMonth() + 1;
  const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const yearOptions = Array.from({ length: currentYear - 2026 + 1 }, (_, index) => String(2026 + index));
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [draftStartMonth, setDraftStartMonth] = useState(startMonth);
  const [draftEndMonth, setDraftEndMonth] = useState(endMonth);
  const formatMonthLabel = (month: string) => {
    const parts = getMonthParts(month);
    if (!parts.month) return "Select month";
    const monthName = new Date(2026, Number(parts.month) - 1, 1).toLocaleDateString("en-US", { month: "long" });
    return parts.year
      ? `${monthName} ${parts.year}`
      : monthName;
  };
  const getMonthParts = (month: string) => {
    const [year, monthNumber] = month.split("-");
    return { year: year ?? "", month: monthNumber ?? "" };
  };
  const updateDraftMonth = (
    currentValue: string,
    update: (value: string) => void,
    part: "year" | "month",
    value: string,
  ) => {
    const parts = getMonthParts(currentValue);
    const year = part === "year" ? value : parts.year;
    const month = part === "month" ? value : parts.month;
    update(part === "year" ? (month ? `${year}-${month}` : year) : (year ? `${year}-${month}` : `-${month}`));
  };
  const draftMonthDifference = draftStartMonth && draftEndMonth
    ? (Number(draftEndMonth.slice(0, 4)) - Number(draftStartMonth.slice(0, 4))) * 12
      + Number(draftEndMonth.slice(5)) - Number(draftStartMonth.slice(5))
    : 0;
  const hasCompleteStart = /^\d{4}-\d{2}$/.test(draftStartMonth);
  const hasCompleteEnd = /^\d{4}-\d{2}$/.test(draftEndMonth);
  const draftError = !hasCompleteStart || !hasCompleteEnd
    ? "Choose both a starting and ending month."
    : draftStartMonth > draftEndMonth
      ? "The starting month must not be later than the ending month."
      : draftMonthDifference > 12
        ? "Custom periods cannot exceed one year."
        : undefined;
  const openCustomDialog = () => {
    setDraftStartMonth(startMonth);
    setDraftEndMonth(endMonth);
    setIsCustomOpen(true);
  };

  const applyCustomRange = () => {
    if (draftError) {
      toast.error(draftError);
      return;
    }
    onRangeChange(draftStartMonth, draftEndMonth);
    onPeriodChange("custom");
    setIsCustomOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="trend-period">Period</Label>
          <Select value={period} onValueChange={(value) => value === "custom" ? openCustomDialog() : onPeriodChange(value as TrendPeriod)}>
            <SelectTrigger id="trend-period" className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Last 3 Months</SelectItem>
              <SelectItem value="6">Last 6 Months</SelectItem>
              <SelectItem value="12">Last 12 Months</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {period === "custom" && (
          <Button variant="outline" onClick={openCustomDialog}>
            <CalendarDays className="h-4 w-4" />
            {formatMonthLabel(startMonth)} – {formatMonthLabel(endMonth)}
          </Button>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Dialog open={isCustomOpen} onOpenChange={setIsCustomOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Choose a custom period</DialogTitle>
            <DialogDescription>Select the starting and ending months for the trend analysis. Future months are unavailable.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 sm:grid-cols-2">
            {[["From", draftStartMonth, setDraftStartMonth], ["To", draftEndMonth, setDraftEndMonth]].map(([label, value, update]) => {
              const monthParts = getMonthParts(value as string);
              return <div className="rounded-lg border bg-muted/20 p-4" key={label as string}>
                <Label className="mb-3 block">
                  {label as string} <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-center gap-2">
                  <Select
                    value={monthParts.month}
                    onValueChange={(month) => updateDraftMonth(value as string, update as (value: string) => void, "month", month)}
                  >
                    <SelectTrigger className="flex-1 bg-background"><SelectValue placeholder="Month" /></SelectTrigger>
                    <SelectContent>
                      {monthOptions.map((month, index) => {
                        const monthNumber = String(index + 1).padStart(2, "0");
                        const disabled = monthParts.year === String(currentYear) && index + 1 > currentMonthNumber;
                        return <SelectItem key={month} value={monthNumber} disabled={disabled}>{month}</SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                  <Select
                    value={monthParts.year}
                    onValueChange={(year) => updateDraftMonth(value as string, update as (value: string) => void, "year", year)}
                  >
                    <SelectTrigger className="w-[105px] bg-background"><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((year) => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{formatMonthLabel(value as string)}</p>
              </div>;
            })}
          </div>
          {draftError && <p className="text-sm text-destructive">{draftError}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomOpen(false)}>Cancel</Button>
            <Button onClick={applyCustomRange}>Apply period</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
