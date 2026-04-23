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
import { useCashAdvanceReports } from "../hooks/useCashAdvanceReports";
import { useReimbursementReports } from "../hooks/useReimbursementReports";

export default function MainReport() {
    const [activeFilter, setActiveFilter] = useState<ReportFilter>("attendance");
    const today = new Date();
    const [attendanceYear, setAttendanceYear] = useState(today.getFullYear());
    const [attendanceMonth, setAttendanceMonth] = useState(today.getMonth());
    const [leaveYear, setLeaveYear] = useState(today.getFullYear());
    const [leaveMonth, setLeaveMonth] = useState(today.getMonth());
    const [cashAdvanceYear, setCashAdvanceYear] = useState(today.getFullYear());
    const [cashAdvanceMonth, setCashAdvanceMonth] = useState(today.getMonth());
    const [cashAdvanceWeek, setCashAdvanceWeek] = useState<"week-1" | "week-2" | "week-3" | "week-4">("week-1");
    const [reimbursementYear, setReimbursementYear] = useState(today.getFullYear());
    const [reimbursementMonth, setReimbursementMonth] = useState(today.getMonth());
    const [reimbursementWeek, setReimbursementWeek] = useState<"week-1" | "week-2" | "week-3" | "week-4">("week-1");
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

    const {
        data: cashAdvanceReport,
        isLoading: loadingCashAdvance,
        error: errorCashAdvance,
    } = useCashAdvanceReports({
        month: cashAdvanceMonth,
        year: cashAdvanceYear,
        week: cashAdvanceWeek,
    });

    const {
        data: reimbursementReport,
        isLoading: loadingReimbursement,
        error: errorReimbursement,
    } = useReimbursementReports({
        month: reimbursementMonth,
        year: reimbursementYear,
        week: reimbursementWeek,
    });

    const reportContent = useMemo(() => {
        switch (activeFilter) {
            case "reimbursement":
                return {
                    title: "Reimbursement Report",
                    description: "Track total reimbursement amounts per employee by selected week.",
                    table: (
                        <ReportsReimbursementTable
                            data={reimbursementReport}
                            isLoading={loadingReimbursement}
                            error={errorReimbursement}
                            searchTerm={searchTerm}
                            page={page}
                            setPage={setPage}
                        />
                    ),
                };
            case "cash-advance":
                return {
                    title: "Cash Advance Report",
                    description: "Monitor cash advances of the employees by selected week.",
                    table: (
                        <ReportsCashAdvanceTable
                            data={cashAdvanceReport}
                            isLoading={loadingCashAdvance}
                            error={errorCashAdvance}
                            searchTerm={searchTerm}
                            page={page}
                            setPage={setPage}
                        />
                    ),
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
            cashAdvanceReport,
        errorAttendance,
            errorCashAdvance,
        errorLeave,
            errorReimbursement,
        leaveReport,
        loadingAttendance,
            loadingCashAdvance,
        loadingLeave,
            loadingReimbursement,
        page,
            reimbursementReport,
        searchTerm,
    ]);

    const isAttendance = activeFilter === "attendance";
            const isLeave = activeFilter === "leave";
            const isCashAdvance = activeFilter === "cash-advance";
            const isReimbursement = activeFilter === "reimbursement";

            const selectedYear = isAttendance
            ? attendanceYear
            : isLeave
              ? leaveYear
              : isCashAdvance
                ? cashAdvanceYear
                : reimbursementYear;

            const selectedMonth = isAttendance
            ? attendanceMonth
            : isLeave
              ? leaveMonth
              : isCashAdvance
                ? cashAdvanceMonth
                : reimbursementMonth;

            const onYearChange = isAttendance
            ? setAttendanceYear
            : isLeave
              ? setLeaveYear
              : isCashAdvance
                ? setCashAdvanceYear
                : setReimbursementYear;

            const onMonthChange = isAttendance
            ? setAttendanceMonth
            : isLeave
              ? setLeaveMonth
              : isCashAdvance
                ? setCashAdvanceMonth
                : setReimbursementMonth;

            const showMonthYear =
            activeFilter === "attendance" ||
            activeFilter === "leave" ||
            activeFilter === "cash-advance" ||
            activeFilter === "reimbursement";

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
                isCashAdvance={isCashAdvance}
                isReimbursement={isReimbursement}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                onYearChange={onYearChange}
                onMonthChange={onMonthChange}
                attendanceCutoff={cutoff}
                onAttendanceCutoffChange={setCutoff}
                cashAdvanceWeek={cashAdvanceWeek}
                onCashAdvanceWeekChange={setCashAdvanceWeek}
                reimbursementWeek={reimbursementWeek}
                onReimbursementWeekChange={setReimbursementWeek}
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