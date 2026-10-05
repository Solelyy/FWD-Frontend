"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { buildGenerateReportPayload } from "../api/report-payload";
import { exportReportApi } from "../api/generateReportApi";
import { useReportPreview } from "../hooks/useReportPreview";
import { useReportsSummary } from "../hooks/useReportsSummary";
import { getReportAvailabilityMessage } from "../utils/report-availability";
import type {
  FileType,
  GenerateReportPayload,
  ModuleKey,
} from "../types/report-builder";
import PeriodFilterPanel from "./PeriodFilterPanel";
import ReportPreviewTable from "./ReportPreviewTable";
import ReportSummaryPanel from "./ReportSummaryPanel";
import ReportTypeSelector from "./ReportTypeSelector";
import ReportsCards from "./ReportsCard";
import { moduleOptions, weekOptions } from "../types/report-builder";

export default function Reports() {
  const today = new Date();

  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedModule, setSelectedModule] = useState<ModuleKey>("ATTENDANCE");

  const [attendanceCutoff, setAttendanceCutoff] = useState("15");
  const [cashAdvanceWeek, setCashAdvanceWeek] = useState("1");
  const [reimbursementWeek, setReimbursementWeek] = useState("1");
  const [previewPayload, setPreviewPayload] =
    useState<GenerateReportPayload | null>(null);

  const summaryQuery = useReportsSummary(selectedMonth + 1, selectedYear);
  const previewMutation = useReportPreview();

  const selectedMonthLabel = useMemo(
    () =>
      new Date(selectedYear, selectedMonth).toLocaleDateString("en-US", {
        month: "long",
      }),
    [selectedMonth, selectedYear],
  );

  const selectedModuleMeta = useMemo(
    () =>
      moduleOptions.find((option) => option.value === selectedModule) ??
      moduleOptions[0],
    [selectedModule],
  );

  const selectedWeek =
    selectedModule === "CASH_ADVANCE" ? cashAdvanceWeek : reimbursementWeek;
  const selectedWeekLabel =
    weekOptions.find((week) => week.value === selectedWeek)?.label ?? "Week 1";

  const getPayload = () =>
    buildGenerateReportPayload({
      selectedModule,
      selectedYear,
      selectedMonth,
      attendanceCutoff,
      cashAdvanceWeek,
      reimbursementWeek,
    });

  const payload = getPayload();
  const isPreviewCurrent =
    previewPayload !== null &&
    JSON.stringify(previewPayload) === JSON.stringify(payload);

  const validateAvailability = () => {
    const message = getReportAvailabilityMessage({
      module: selectedModule,
      year: selectedYear,
      month: selectedMonth,
      cutoff: attendanceCutoff,
      week:
        selectedModule === "CASH_ADVANCE" ? cashAdvanceWeek : reimbursementWeek,
    });

    if (message) {
      toast.warning(message);
      return false;
    }

    return true;
  };

  const handleGenerate = async () => {
    if (!validateAvailability()) return;

    try {
      const preview = await previewMutation.mutateAsync(payload);
      setPreviewPayload(payload);
      toast.success("Report preview generated.");
      return preview;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to generate report preview.",
      );
    }
  };

  const handleExport = async (fileType: FileType) => {
    if (!isPreviewCurrent) {
      toast.warning("Generate the report preview before exporting.");
      return;
    }

    try {
      await exportReportApi(payload, fileType);
      toast.success(`Report exported as ${fileType.toUpperCase()}.`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to export report.",
      );
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      <ReportsCards data={summaryQuery.data} />

      {/* My Reports */}
      <Card className="space-y-5 p-5 md:p-6">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">My Reports</h2>
          <p className="text-sm text-muted-foreground">
            Select period, choose one report type, then generate.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            <PeriodFilterPanel
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              selectedModule={selectedModule}
              attendanceCutoff={attendanceCutoff}
              cashAdvanceWeek={cashAdvanceWeek}
              reimbursementWeek={reimbursementWeek}
              weekOptions={weekOptions}
              onYearChange={setSelectedYear}
              onMonthChange={setSelectedMonth}
              onAttendanceCutoffChange={setAttendanceCutoff}
              onCashAdvanceWeekChange={setCashAdvanceWeek}
              onReimbursementWeekChange={setReimbursementWeek}
            />

            <ReportTypeSelector
              moduleOptions={moduleOptions}
              selectedModule={selectedModule}
              onModuleChange={setSelectedModule}
            />
          </div>

          <ReportSummaryPanel
            selectedModule={selectedModule}
            selectedModuleMeta={selectedModuleMeta}
            selectedYear={selectedYear}
            selectedMonthLabel={selectedMonthLabel}
            attendanceCutoff={attendanceCutoff}
            selectedWeekLabel={selectedWeekLabel}
            isGenerating={previewMutation.isPending}
            hasPreview={isPreviewCurrent}
            onGenerate={handleGenerate}
            onExport={handleExport}
          />
        </div>
      </Card>
      {previewMutation.data && isPreviewCurrent && (
        <Card className="space-y-4 p-5 md:p-6">
          <div>
            <h2 className="text-lg font-semibold">Report Preview</h2>
            <p className="text-base text-muted-foreground">
              Here is your generated report. Feel free to export it.
            </p>
          </div>
          <ReportPreviewTable preview={previewMutation.data} />
        </Card>
      )}
    </div>
  );
}
