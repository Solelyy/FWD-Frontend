"use client"

import { useMemo, useState } from "react";
import ReportsAttendanceTable from "./AttendanceTable";
import ReportsCashAdvanceTable from "./CashAdvanceTable";
import FilterButtons, { type ReportFilter } from "./FilterButtons";
import ReportsLeaveTable from "./LeaveTable";
import ReportsReimbursementTable from "./ReimbursementTable";
import ReportsTableWrapper from "./ReportsTableWrapper";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";

export default function MainReport() {
    const [activeFilter, setActiveFilter] = useState<ReportFilter>("attendance");

    const reportContent = useMemo(() => {
        switch (activeFilter) {
            case "reimbursement":
                return {
                    title: "Reimbursement Report",
                    description: "Track total reimbursement amounts per employee.",
                    table: <ReportsReimbursementTable />,
                };
            case "cash-advance":
                return {
                    title: "Cash Advance Report",
                    description: "Monitor cash advance payouts by employee.",
                    table: <ReportsCashAdvanceTable />,
                };
            case "leave":
                return {
                    title: "Leave Report",
                    description: "Review leave usage and remaining balances.",
                    table: <ReportsLeaveTable />,
                };
            case "attendance":
            default:
                return {
                    title: "Attendance Report",
                    description: "View employee attendance and working time summary.",
                    table: <ReportsAttendanceTable />,
                };
        }
    }, [activeFilter]);

    return (
        <div className="flex flex-col gap-6">
            <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            
            <ReportsTableWrapper
                title={reportContent.title}
                description={reportContent.description}
                table={reportContent.table}
            />
            
            <div className="flex justify-end">
               <Button>
                    <FileUp />
                    Export Report
                </Button> 
            </div>
        </div>
    );
}