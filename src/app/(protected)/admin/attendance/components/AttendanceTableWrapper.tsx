"use client"

import SearchBar from "@/components/shared/SearchBar";
import DatePicker from "./DatePicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import FilterButtons from "./FilterButtons";
import AttendanceTable from "./AttendanceTable";
import { useEmployeeAttendance } from "../hooks/useEmployeesAttendance";
import { AttendanceStatusFilter } from "../types/attendance-types";
import { useAttendanceStats } from "../hooks/useAttendanceStats";
import AttendanceCards from "./AttendanceCards";

export default function AttendanceTableWrapper() {
    const today = new Date();
    const [searchTerm, setSearchTerm] = useState("");
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [day, setDay] = useState(today.getDate());
    const [page, setPage] = useState(1);
    const limit = 10;

    const [filter, setFilter] = useState<AttendanceStatusFilter>(AttendanceStatusFilter.ALL);

    const {data, isLoading, error} = useEmployeeAttendance({page, limit, year, month, day, filter});
    const {data: attendanceStats, isLoading: attendanceStats_isLoading} = useAttendanceStats(day, month, year)
    return ( 
        <>
        <AttendanceCards data={attendanceStats}/>
        <Card>
            <CardHeader>
                <CardTitle>
                    Attendance Records
                </CardTitle>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <CardDescription> This is the daily attendance of employees</CardDescription>
                    <div className="flex gap-2">
                        <DatePicker
                            year={year}
                            month={month}
                            day={day}
                            onYearChange={setYear}
                            onMonthChange={setMonth}
                            onDayChange={setDay}
                        />
                        <SearchBar value={searchTerm} onChange ={setSearchTerm} />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <FilterButtons filter={filter} onFilterChange={setFilter}/>
                <AttendanceTable data={data} error={error} isLoading={isLoading} page={page} setPage={setPage} searchTerm={searchTerm}/> 
            </CardContent>
        </Card>
        </>
    )
}