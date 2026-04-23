import { MonthYearPicker } from "@/components/shared/MonthYearPicker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import type { ModuleKey, WeekOption } from "../types/report-builder";

type PeriodFilterPanelProps = {
    selectedYear: number;
    selectedMonth: number;
    selectedModule: ModuleKey;
    attendanceCutoff: string;
    cashAdvanceWeek: string;
    reimbursementWeek: string;
    weekOptions: WeekOption[];
    onYearChange: (year: number) => void;
    onMonthChange: (month: number) => void;
    onAttendanceCutoffChange: (cutoff: string) => void;
    onCashAdvanceWeekChange: (week: string) => void;
    onReimbursementWeekChange: (week: string) => void;
};

export default function PeriodFilterPanel({
    selectedYear,
    selectedMonth,
    selectedModule,
    attendanceCutoff,
    cashAdvanceWeek,
    reimbursementWeek,
    weekOptions,
    onYearChange,
    onMonthChange,
    onAttendanceCutoffChange,
    onCashAdvanceWeekChange,
    onReimbursementWeekChange,
}: PeriodFilterPanelProps) {
    return (
        <div className="rounded-lg border p-4">
            <p className="mb-3 text-sm font-medium">Period and Filter</p>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <p className="text-sm font-medium">Month and Year</p>
                    <MonthYearPicker
                        year={selectedYear}
                        month={selectedMonth}
                        onYearChange={onYearChange}
                        onMonthChange={onMonthChange}
                    />
                </div>

                {selectedModule === "attendance" && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Cutoff</p>
                        <Select value={attendanceCutoff} onValueChange={onAttendanceCutoffChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select cutoff" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="15">15th Cutoff</SelectItem>
                                <SelectItem value="30">30th Cutoff</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {selectedModule === "cashAdvance" && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Week</p>
                        <Select value={cashAdvanceWeek} onValueChange={onCashAdvanceWeekChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select week" />
                            </SelectTrigger>
                            <SelectContent>
                                {weekOptions.map((week) => (
                                    <SelectItem key={week.value} value={week.value}>
                                        {week.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {selectedModule === "reimbursement" && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Week</p>
                        <Select value={reimbursementWeek} onValueChange={onReimbursementWeekChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select week" />
                            </SelectTrigger>
                            <SelectContent>
                                {weekOptions.map((week) => (
                                    <SelectItem key={week.value} value={week.value}>
                                        {week.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {selectedModule === "leave" && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Coverage</p>
                        <div className="rounded-md border bg-muted/40 px-3 py-2">
                            <p className="text-sm font-medium">Whole Year</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
