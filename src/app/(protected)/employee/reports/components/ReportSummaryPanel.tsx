import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { ModuleKey, ModuleOption } from "../types/report-builder";

type ReportSummaryPanelProps = {
    selectedModule: ModuleKey;
    selectedModuleMeta: ModuleOption;
    selectedYear: number;
    selectedMonthLabel: string;
    attendanceCutoff: string;
    selectedWeekLabel: string;
    isGenerating?: boolean;
    onGenerate: () => void;
};

export default function ReportSummaryPanel({
    selectedModule,
    selectedModuleMeta,
    selectedYear,
    selectedMonthLabel,
    attendanceCutoff,
    selectedWeekLabel,
    isGenerating = false,
    onGenerate,
}: ReportSummaryPanelProps) {
    return (
        <div className="rounded-lg border bg-muted/20 p-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Summary
            </p>

            <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">Report</span>
                    <span className="font-medium text-right">{selectedModuleMeta.label}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">Period</span>
                    <span className="font-medium text-right">
                        {selectedMonthLabel} {selectedYear}
                    </span>
                </div>

                {selectedModule === "attendance" && (
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Cutoff</span>
                        <span className="font-medium">{attendanceCutoff}th</span>
                    </div>
                )}

                {(selectedModule === "cashAdvance" || selectedModule === "reimbursement") && (
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Week</span>
                        <span className="font-medium">{selectedWeekLabel}</span>
                    </div>
                )}

                {selectedModule === "leave" && (
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Coverage</span>
                        <span className="font-medium">Whole Year</span>
                    </div>
                )}
            </div>

            <div className="mt-5 flex flex-col gap-2">
                <Button onClick={onGenerate} disabled={isGenerating}>
                    <Download className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate Report"}
                </Button>
            </div>
        </div>
    );
}
