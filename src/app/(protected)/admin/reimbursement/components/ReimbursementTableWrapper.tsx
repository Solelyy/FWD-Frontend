"use client"
import SearchBar from "@/components/shared/SearchBar";
import DatePicker from "@/app/(protected)/admin/leave/components/DatePicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTodayFormatted } from "@/lib/util/date-format";
import { useState } from "react";
import FilterButtons from "@/app/(protected)/admin/leave/components/LeaveFilterButtons";
import ReimbursementTable from "./ReimbursementTable";
import ReimbursementCard from "./ReimbursementCard";
import { useEmployeesReimbursementSummary } from "../hooks/useEmployeesReimbursementSummary";
import { useEmployeesReimbursementRequests } from "../hooks/useEmployeesReimbursementRequests";
import { LeaveStatusFilter } from "../../leave/types/leave";
import { MonthYearPicker } from "@/components/shared/MonthYearPicker";

export default function ReimbursementTableWrapper() {
    const [searchTerm, setSearchTerm] = useState("");
     const today = new Date();
    const limit = 10;
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<LeaveStatusFilter>(LeaveStatusFilter.ALL);

    const {data: summary, } = useEmployeesReimbursementSummary(month, year);
    const {data, isLoading, error } = useEmployeesReimbursementRequests({page, year, month, filter, limit})
    return ( 
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <ReimbursementCard data={summary}/>
        
            <Card>
                <CardHeader>
                    <CardTitle className="md: text-lg">
                        Reimbursement Records
                    </CardTitle>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <CardDescription> This shows monthly reimbursement requests </CardDescription>
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
                    <ReimbursementTable data={data} page={page} isLoading={isLoading} setPage={setPage} searchTerm={searchTerm} error={error}/> 
                </CardContent>
            </Card>
        </div>
    )
}