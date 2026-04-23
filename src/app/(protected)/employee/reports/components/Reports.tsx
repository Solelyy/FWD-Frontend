"use client";

import { useMemo, useState } from "react";

import { Card } from "@/components/ui/card";
import { CalendarCheck, Calendar1 , PhilippinePeso, Wallet} from "lucide-react";
import { buildGenerateReportPayload } from "../api/report-payload";
import { useReportsSummary } from "../hooks/useReportsSummary";
import type {
    GenerateReportPayload,
    ModuleKey,
    ModuleOption,
    WeekOption,
} from "../types/report-builder";
import PeriodFilterPanel from "./PeriodFilterPanel";
import ReportSummaryPanel from "./ReportSummaryPanel";
import ReportTypeSelector from "./ReportTypeSelector";
import ReportsCards from "./ReportsCard";

type ReportsProps = {
    onGenerateReport?: (payload: GenerateReportPayload) => void | Promise<void>;
    isGenerating?: boolean;
};

const moduleOptions: ModuleOption[] = [
    {
        value: "attendance",
        label: "Attendance Report",
        description: "Coverage by payroll cutoff date.",
        icon: CalendarCheck,
    },
    {
        value: "leave",
        label: "Leave Report",
        description: "Annual report for all approved and pending leave requests.",
        icon: Calendar1,
    },
    {
        value: "cashAdvance",
        label: "Cash Advance Report",
        description: "Weekly summary of requested and approved cash advances.",
        icon: PhilippinePeso,
    },
    {
        value: "reimbursement",
        label: "Reimbursement Report",
        description: "Weekly report for reimbursement claims and release status.",
        icon: Wallet,
    },
];

const weekOptions: WeekOption[] = [
    { value: "week-1", label: "Week 1" },
    { value: "week-2", label: "Week 2" },
    { value: "week-3", label: "Week 3" },
    { value: "week-4", label: "Week 4" },
];

export default function Reports({ onGenerateReport, isGenerating = false }: ReportsProps) {
    const today = new Date();

    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedModule, setSelectedModule] = useState<ModuleKey>("attendance");

    const [attendanceCutoff, setAttendanceCutoff] = useState("15");
    const [cashAdvanceWeek, setCashAdvanceWeek] = useState("week-1");
    const [reimbursementWeek, setReimbursementWeek] = useState("week-1");

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

    const selectedWeek = selectedModule === "cashAdvance" ? cashAdvanceWeek : reimbursementWeek;
    const selectedWeekLabel =
        weekOptions.find((week) => week.value === selectedWeek)?.label ?? "Week 1";

    const handleGenerate = () => {
        const payload = buildGenerateReportPayload({
            selectedModule,
            selectedYear,
            selectedMonth,
            attendanceCutoff,
            cashAdvanceWeek,
            reimbursementWeek,
        });

        if (onGenerateReport) {
            void onGenerateReport(payload);
        }
    };

    return (
        <div className="space-y-6">
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