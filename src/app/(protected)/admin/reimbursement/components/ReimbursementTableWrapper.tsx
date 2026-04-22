"use client"
import SearchBar from "@/components/shared/SearchBar";
import DatePicker from "@/app/(protected)/admin/leave/components/DatePicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTodayFormatted } from "@/lib/util/date-format";
import { useState } from "react";
import FilterButtons from "@/app/(protected)/admin/leave/components/LeaveFilterButtons";
import AttendanceTable from "./ReimbursementTable";
import ReimbursementCard from "./ReimbursementCard";
import { useEmployeesReimbursementSummary } from "../hooks/useEmployeesReimbursementSummary";

export default function ReimbursementTableWrapper() {
    const [searchTerm, setSearchTerm] = useState("");
     const today = new Date();
    const limit = 10;
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [page, setPage] = useState(1);

    const {data: summary, } = useEmployeesReimbursementSummary(month, year);
    return ( 
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <ReimbursementCard data={summary}/>
        
            <Card>
                <CardHeader>
                    <CardTitle>
                        Reimbursement Records
                    </CardTitle>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <CardDescription> {getTodayFormatted()} </CardDescription>
                        <div className="flex gap-2">
                            <DatePicker />
                            <SearchBar value={searchTerm} onChange ={setSearchTerm} />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    {/* <FilterButtons />*/}
                    <AttendanceTable /> 
                </CardContent>
            </Card>
        </div>
    )
}