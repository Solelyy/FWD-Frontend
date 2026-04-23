"use client"
import SearchBar from "@/components/shared/SearchBar";
import { MonthYearPicker } from "@/components/shared/MonthYearPicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ReportsTableWrapperProps = {
    title: string;
    description: string;
    table: React.ReactNode;
    showMonthYear?: boolean;
    isAttendance?: boolean;
    isCashAdvance?: boolean;
    isReimbursement?: boolean;
    selectedYear?: number;
    selectedMonth?: number;
    onYearChange?: (year: number) => void;
    onMonthChange?: (month: number) => void;
    attendanceCutoff?: "15" | "30";
    onAttendanceCutoffChange?: (cutoff: "15" | "30") => void;
    cashAdvanceWeek?: "week-1" | "week-2" | "week-3" | "week-4";
    onCashAdvanceWeekChange?: (week: "week-1" | "week-2" | "week-3" | "week-4") => void;
    reimbursementWeek?: "week-1" | "week-2" | "week-3" | "week-4";
    onReimbursementWeekChange?: (week: "week-1" | "week-2" | "week-3" | "week-4") => void;
    searchTerm?: string;
    onSearchTermChange?: (searchTerm: string) => void;
}

export default function ReportsTableWrapper({
    title,
    description,
    table,
    showMonthYear = false,
    isAttendance = false,
    isCashAdvance = false,
    isReimbursement = false,
    selectedYear,
    selectedMonth,
    onYearChange,
    onMonthChange,
    attendanceCutoff = "15",
    onAttendanceCutoffChange,
    cashAdvanceWeek = "week-1",
    onCashAdvanceWeekChange,
    reimbursementWeek = "week-1",
    onReimbursementWeekChange,
    searchTerm = "",
    onSearchTermChange,
} : ReportsTableWrapperProps) {
    return ( 
        <Card>
            <CardHeader>
                <CardTitle className="md:text-lg">
                    {title}
                </CardTitle>
                <div className="flex flex-col gap-4">
                    <CardDescription>{description}</CardDescription>
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                            {showMonthYear && selectedYear !== undefined && selectedMonth !== undefined && onYearChange && onMonthChange && (
                                <MonthYearPicker
                                    year={selectedYear}
                                    month={selectedMonth}
                                    onYearChange={onYearChange}
                                    onMonthChange={onMonthChange}
                                />
                            )}

                            {isAttendance && (
                                <div className="min-w-36">
                                    <Select
                                        value={attendanceCutoff}
                                        onValueChange={(value) =>
                                            onAttendanceCutoffChange?.(value === "30" ? "30" : "15")
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Cutoff" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="15">15th cutoff</SelectItem>
                                            <SelectItem value="30">30th cutoff</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {isCashAdvance && (
                                <div className="min-w-36">
                                    <Select
                                        value={cashAdvanceWeek}
                                        onValueChange={(value) => {
                                            const nextWeek =
                                                value === "week-2" || value === "week-3" || value === "week-4"
                                                    ? value
                                                    : "week-1";

                                            onCashAdvanceWeekChange?.(nextWeek);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Week" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="week-1">Week 1</SelectItem>
                                            <SelectItem value="week-2">Week 2</SelectItem>
                                            <SelectItem value="week-3">Week 3</SelectItem>
                                            <SelectItem value="week-4">Week 4</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {isReimbursement && (
                                <div className="min-w-36">
                                    <Select
                                        value={reimbursementWeek}
                                        onValueChange={(value) => {
                                            const nextWeek =
                                                value === "week-2" || value === "week-3" || value === "week-4"
                                                    ? value
                                                    : "week-1";

                                            onReimbursementWeekChange?.(nextWeek);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Week" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="week-1">Week 1</SelectItem>
                                            <SelectItem value="week-2">Week 2</SelectItem>
                                            <SelectItem value="week-3">Week 3</SelectItem>
                                            <SelectItem value="week-4">Week 4</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-auto md:shrink-0">
                            <SearchBar value={searchTerm} onChange={onSearchTermChange ?? (() => undefined)} />
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                {table}
            </CardContent>
        </Card>
    )
}