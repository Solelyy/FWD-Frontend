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
import { useAttendanceReports } from "../hooks/useAttendanceReports";

export default function MainReport() {
    const [activeFilter, setActiveFilter] = useState<ReportFilter>("attendance");
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [cutoff, setCutoff] = useState<"15" | "30">("15");
    const [page, setPage] = useState(1);

    const {data: attendanceReport, isLoading: loadingAttendance, error: errorAttendance} = useAttendanceReports({cutoff, month, year})
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
                    table: <ReportsAttendanceTable data={attendanceReport} isLoading={loadingAttendance} error={errorAttendance} page={page} setPage={setPage}/>,
                };
        }
    }, [activeFilter]);

    const isAttendance = activeFilter === "attendance";

    return (
        <div className="flex flex-col gap-6">
            <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            
            <ReportsTableWrapper
                title={reportContent.title}
                description={
                    isAttendance
                        ? `${reportContent.description} Showing ${cutoff}th cutoff.`
                        : reportContent.description
                }
                table={reportContent.table}
                isAttendance={isAttendance}
                selectedYear={year}
                selectedMonth={month}
                onYearChange={setYear}
                onMonthChange={setMonth}
                attendanceCutoff={cutoff}
                onAttendanceCutoffChange={setCutoff}
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