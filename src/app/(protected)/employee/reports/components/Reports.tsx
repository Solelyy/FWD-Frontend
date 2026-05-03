"use client";

import { useMemo, useState } from "react";

import { Card } from "@/components/ui/card";
import { buildGenerateReportPayload } from "../api/report-payload";
import { useReportsSummary } from "../hooks/useReportsSummary";
import type { FileType, GenerateReportPayload, ModuleKey, } from "../types/report-builder";
import PeriodFilterPanel from "./PeriodFilterPanel";
import ReportSummaryPanel from "./ReportSummaryPanel";
import ReportTypeSelector from "./ReportTypeSelector";
import ReportsCards from "./ReportsCard";
import { moduleOptions, weekOptions } from "../types/report-builder"
import { exportReportApi } from "../api/generateReportApi";

type ReportsProps = {
    onGenerateReport?: (payload: GenerateReportPayload) => void | Promise<void>;
    isGenerating?: boolean;
};

export default function Reports({ onGenerateReport, isGenerating = false }: ReportsProps) {
    const today = new Date();

    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedModule, setSelectedModule] = useState<ModuleKey>("ATTENDANCE");

    const [attendanceCutoff, setAttendanceCutoff] = useState("15");
    const [cashAdvanceWeek, setCashAdvanceWeek] = useState("1");
    const [reimbursementWeek, setReimbursementWeek] = useState("1");

    const summaryQuery = useReportsSummary(selectedMonth + 1, selectedYear);

    const selectedMonthLabel = useMemo(
        () =>
            new Date(selectedYear, selectedMonth).toLocaleDateString("en-US", {
                month: "long",
            }),
        [selectedMonth, selectedYear],
    );

    const selectedModuleMeta = useMemo(
        () => moduleOptions.find((option) => option.value === selectedModule) ?? moduleOptions[0],
        [selectedModule],
    );

    const selectedWeek = selectedModule === "CASH_ADVANCE" ? cashAdvanceWeek : reimbursementWeek;
    const selectedWeekLabel =
        weekOptions.find((week) => week.value === selectedWeek)?.label ?? "Week 1";

    const handleGenerate = async (fileType: FileType) => {
        const payload = buildGenerateReportPayload({
            selectedModule,
            selectedYear,
            selectedMonth,
            attendanceCutoff,
            cashAdvanceWeek,
            reimbursementWeek,
        });

        await exportReportApi(payload, fileType);
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
                        isGenerating={isGenerating}
                        onGenerate={handleGenerate}
                    />
                </div>
            </Card>
        </div>
    )
}      