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
import { useLeaveReports } from "../hooks/useLeaveReports";

export default function MainReport() {
    const [activeFilter, setActiveFilter] = useState<ReportFilter>("attendance");
    const today = new Date();
    const [attendanceYear, setAttendanceYear] = useState(today.getFullYear());
    const [attendanceMonth, setAttendanceMonth] = useState(today.getMonth());
    const [leaveYear, setLeaveYear] = useState(today.getFullYear());
    const [leaveMonth, setLeaveMonth] = useState(today.getMonth());
    const [cutoff, setCutoff] = useState<"15" | "30">("15");
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const {
        data: attendanceReport,
        isLoading: loadingAttendance,
        error: errorAttendance,
    } = useAttendanceReports({ cutoff, month: attendanceMonth, year: attendanceYear });

    const {
        data: leaveReport,
        isLoading: loadingLeave,
        error: errorLeave,
    } = useLeaveReports({ month: leaveMonth, year: leaveYear });

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
                    table: (
                        <ReportsLeaveTable
                            data={leaveReport}
                            isLoading={loadingLeave}
                            error={errorLeave}
                            searchTerm={searchTerm}
                            page={page}
                            setPage={setPage}
                        />
                    ),
                };
            case "attendance":
            default:
                return {
                    title: "Attendance Report",
                    description: "View employee attendance and working time summary.",
                    table: (
                        <ReportsAttendanceTable
                            data={attendanceReport}
                            isLoading={loadingAttendance}
                            error={errorAttendance}
                            searchTerm={searchTerm}
                            page={page}
                            setPage={setPage}
                        />
                    ),
                };
        }
    }, [
        activeFilter,
        attendanceReport,
        errorAttendance,
        errorLeave,
        leaveReport,
        loadingAttendance,
        loadingLeave,
        page,
        searchTerm,
    ]);

    const isAttendance = activeFilter === "attendance";
    const selectedYear = isAttendance ? attendanceYear : leaveYear;
    const selectedMonth = isAttendance ? attendanceMonth : leaveMonth;
    const showMonthYear = activeFilter === "attendance" || activeFilter === "leave";

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
                showMonthYear={showMonthYear}
                isAttendance={isAttendance}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                onYearChange={isAttendance ? setAttendanceYear : setLeaveYear}
                onMonthChange={isAttendance ? setAttendanceMonth : setLeaveMonth}
                attendanceCutoff={cutoff}
                onAttendanceCutoffChange={setCutoff}
                searchTerm={searchTerm}
                onSearchTermChange={(value) => {
                    setSearchTerm(value);
                    setPage(1);
                }}
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