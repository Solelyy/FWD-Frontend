"use client"
import SearchBar from "@/components/shared/SearchBar";
import { MonthYearPicker } from "@/components/shared/MonthYearPicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

type ReportsTableWrapperProps = {
    title: string;
    description: string;
    table: React.ReactNode;
    isAttendance?: boolean;
    selectedYear?: number;
    selectedMonth?: number;
    onYearChange?: (year: number) => void;
    onMonthChange?: (month: number) => void;
    attendanceCutoff?: "15" | "30";
    onAttendanceCutoffChange?: (cutoff: "15" | "30") => void;
}

export default function ReportsTableWrapper({
    title,
    description,
    table,
    isAttendance = false,
    selectedYear,
    selectedMonth,
    onYearChange,
    onMonthChange,
    attendanceCutoff = "15",
    onAttendanceCutoffChange,
} : ReportsTableWrapperProps) {
    const [searchTerm, setSearchTerm] = useState("");
    
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
                            {isAttendance && selectedYear !== undefined && selectedMonth !== undefined && onYearChange && onMonthChange && (
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
                        </div>

                        <div className="w-full md:w-auto md:shrink-0">
                            <SearchBar value={searchTerm} onChange ={setSearchTerm} />
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