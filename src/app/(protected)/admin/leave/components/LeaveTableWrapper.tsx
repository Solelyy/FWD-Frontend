"use client"
import SearchBar from "@/components/shared/SearchBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import FilterButtons from "./LeaveFilterButtons";
import AttendanceTable from "./LeaveTable";
import LeaveCards from "./LeaveCards";
import { useLeaveStats } from "../hooks/useLeaveStats";
import { LeaveStatusFilter } from "../types/leave";
import { useEmployeesLeaveRequests } from "../hooks/useEmployeesLeaveRequests";
import LeaveBalances from "./LeaveBalances";
import { MonthYearPicker } from "@/components/shared/MonthYearPicker";

export default function LeaveTableWrapper() {
    const today = new Date();
    const limit = 10;
    const [searchTerm, setSearchTerm] = useState("");
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<LeaveStatusFilter>(LeaveStatusFilter.ALL);

    const {data: leaveStats } = useLeaveStats(month, year);
    const {data: leaveRequests, error, isLoading } = useEmployeesLeaveRequests({page, limit, filter, month, year})
    
    return ( 
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
        <LeaveCards data={leaveStats} />
        <Card className="space-y-4">
            <CardHeader>
                <CardTitle className="md:text-lg">
                    Leave Records
                </CardTitle>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <CardDescription className="md:text-base">This shows monthly leave requests</CardDescription>
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

            <CardContent className="flex flex-col gap-4 space-y-2">
                <FilterButtons filter={filter} onFilterChange={setFilter}/>
                <AttendanceTable data={leaveRequests} error={error} isLoading={isLoading} page={page} setPage={setPage} searchTerm={searchTerm}/> 
            </CardContent>
        </Card>

        <LeaveBalances />
        </div>
    )
}