"use client"

import SearchBar from "@/components/shared/SearchBar";
import DatePicker from "@/app/(protected)/admin/leave/components/DatePicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTodayFormatted } from "@/lib/util/date-format";
import { useState } from "react";
import FilterButtons from "@/app/(protected)/admin/leave/components/LeaveFilterButtons";
import AttendanceTable from "./CashAdvanceTable";
import { useEmployeesCASummary } from "../hooks/useEmployeesCASummary";
import CashAdvanceCard from "./CashAdvanceCard";
import { useEmployeesCARequests } from "../hooks/useEmployeesCARequests";
import { LeaveStatusFilter } from "../../leave/types/leave";
import { MonthYearPicker } from "@/components/shared/MonthYearPicker";

export default function CashAdvanceTableWrapper() {
    const today = new Date();
    const limit = 10;

    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<LeaveStatusFilter>(LeaveStatusFilter.ALL);

    const [searchTerm, setSearchTerm] = useState("");
    const {data: summary,} = useEmployeesCASummary();
    const {data: requests, isLoading, error} = useEmployeesCARequests({page, month, year, limit, filter});
    
    return ( 
        <div className="space-y-6">
        <CashAdvanceCard data={summary} />
        
        <Card>
            <CardHeader>
                <CardTitle className="md: text-lg">
                    Cash Advance Records
                </CardTitle>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <CardDescription> This shows monthly cash advance requests</CardDescription>
                    <div className="flex gap-2">
                        <MonthYearPicker 
                            year={year} 
                            month={month} 
                            onYearChange={setYear} 
                            onMonthChange={setMonth}
                        />
                        <SearchBar value={searchTerm} onChange ={setSearchTerm} />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <FilterButtons filter={filter} onFilterChange={setFilter}/>
                <AttendanceTable data={requests} isLoading={isLoading} error={error} page={page} setPage={setPage} searchTerm={searchTerm}/> 
            </CardContent>
        </Card>
        </div>
    )
}