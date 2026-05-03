import { Download, ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { FileType, ModuleKey, ModuleOption } from "../types/report-builder";

type ReportSummaryPanelProps = {
    selectedModule: ModuleKey;
    selectedModuleMeta: ModuleOption;
    selectedYear: number;
    selectedMonthLabel: string;
    attendanceCutoff: string;
    selectedWeekLabel: string;
    isGenerating?: boolean;
    onGenerate: (fileType: FileType) => void;
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
    const [selectedFileType, setSelectedFileType] = useState<FileType>("pdf");

    const fileTypeLabels: Record<FileType, string> = {
        pdf: "Export PDF",
        csv: "Export CSV",
        xlsx: "Export Excel",
    };

    const handleFileTypeSelect = (fileType: FileType) => {
        setSelectedFileType(fileType);
    };

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

                {selectedModule === "ATTENDANCE" && (
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Cutoff</span>
                        <span className="font-medium">{attendanceCutoff}th</span>
                    </div>
                )}

                {(selectedModule === "CASH_ADVANCE" || selectedModule === "REIMBURSEMENT") && (
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Week</span>
                        <span className="font-medium">{selectedWeekLabel}</span>
                    </div>
                )}

                {selectedModule === "LEAVE" && (
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Coverage</span>
                        <span className="font-medium">Whole Year</span>
                    </div>
                )}
            </div>

            <div className="mt-5 flex flex-col gap-2">
                <div className="flex gap-0 border rounded-lg overflow-hidden">
                    <Button 
                        disabled={isGenerating}
                        className="flex-1 rounded-none border-0"
                        onClick={() => onGenerate(selectedFileType)}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        {isGenerating ? "Generating..." : fileTypeLabels[selectedFileType]}
                    </Button>
                    <div className="w-px bg-border"></div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                disabled={isGenerating}
                                className="rounded-none border-0 px-2 w-auto"
                            >
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                                onClick={() => handleFileTypeSelect("pdf")}
                                className={selectedFileType === "pdf" ? "bg-accent" : ""}
                            >
                                Export PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={() => handleFileTypeSelect("csv")}
                                className={selectedFileType === "csv" ? "bg-accent" : ""}
                            >  
                                Export CSV
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={() => handleFileTypeSelect("xlsx")}
                                className={selectedFileType === "xlsx" ? "bg-accent" : ""}
                            >
                                Export Excel
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
