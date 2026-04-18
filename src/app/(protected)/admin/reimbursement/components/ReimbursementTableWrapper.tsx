"use client"
import SearchBar from "@/components/shared/SearchBar";
import DatePicker from "@/app/(protected)/admin/leave/components/DatePicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTodayFormatted } from "@/lib/util/date-format";
import { useState } from "react";
import FilterButtons from "@/app/(protected)/admin/leave/components/LeaveFilterButtons";
import AttendanceTable from "./ReimbursementTable";

export default function ReimbursementTableWrapper() {
    const [searchTerm, setSearchTerm] = useState("");
    
    return ( 
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
    )
}