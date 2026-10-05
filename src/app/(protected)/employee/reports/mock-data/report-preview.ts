import type { GenerateReportPayload, ReportPreview } from "../types/report-builder";
import { fullName } from "@/lib/util/name-format";

const employee = {
    firstname: "Juan",
    lastname: "Dela Cruz",
};

function formatDate(year: number, month: number, day: number) {
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatDateRange(year: number, month: number, endDay: number) {
    const startDay = endDay === 30 ? 16 : 1;
    const monthLabel = new Date(year, month - 1, endDay).toLocaleDateString("en-US", {
        month: "long",
    });

    return `${monthLabel} ${startDay} - ${endDay}, ${year}`;
}

function getAttendancePreview(payload: GenerateReportPayload): ReportPreview {
    const cutoff = payload.filter.type === "cutoff" && payload.filter.value === "30" ? 30 : 15;
    const startDay = cutoff === 30 ? 16 : 1;
    const rows: ReportPreview["rows"] = [];
    let totalOvertime = 0;
    let totalPayableHours = 0;

    for (let day = startDay; day <= cutoff; day += 1) {
        const date = new Date(payload.period.year, payload.period.month - 1, day);
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        if (isWeekend) {
            continue;
        }

        const payableHours = 8;
        const overtimeHours = day % 7 === 0 ? 2 : 0;

        totalOvertime += overtimeHours;
        totalPayableHours += payableHours;

        rows.push({
            Date: formatDate(payload.period.year, payload.period.month, day),
            Status: "Present",
            "Time In": "8:00 AM",
            "Time Out": "5:00 PM",
            "Regular Hours": payableHours,
            "Overtime Hours": overtimeHours,
            "Payable Hours": payableHours,
        });
    }

    return {
        employeeName: fullName(employee.firstname, employee.lastname),
        reportLabel: `Attendance (${cutoff}th cutoff)`,
        dateLabel: formatDateRange(payload.period.year, payload.period.month, cutoff),
        columns: [
            "Date",
            "Status",
            "Time In",
            "Time Out",
            "Regular Hours",
            "Overtime Hours",
            "Payable Hours",
        ],
        rows,
        totals: [
            { label: "Regular Hours", value: totalPayableHours },
            { label: "Overtime Hours", value: totalOvertime },
            { label: "Payable Hours", value: totalPayableHours },
        ],
    };
}

function getSelectedWeekDate(payload: GenerateReportPayload) {
    const week = payload.filter.type === "week" ? Number(payload.filter.value) : 1;
    const day = Math.min((week - 1) * 7 + 1, new Date(payload.period.year, payload.period.month, 0).getDate());

    return formatDate(payload.period.year, payload.period.month, day);
}

function getTransactionPreview(
    payload: GenerateReportPayload,
    module: "CASH_ADVANCE" | "REIMBURSEMENT",
): ReportPreview {
    const isCashAdvance = module === "CASH_ADVANCE";

    return {
        employeeName: fullName(employee.firstname, employee.lastname),
        reportLabel: isCashAdvance ? "Cash Advance" : "Reimbursement",
        dateLabel: getSelectedWeekDate(payload),
        columns: ["Date", "Amount", "Status"],
        rows: [
            {
                Date: getSelectedWeekDate(payload),
                Amount: isCashAdvance ? 5000 : 6800,
                Status: isCashAdvance ? "Approved" : "Released",
            },
        ],
        totals: [
            {
                label: isCashAdvance ? "Total Cash Advance" : "Total Reimbursement",
                value: isCashAdvance ? 5000 : 6800,
            },
        ],
    };
}

export function getMockReportPreview(payload: GenerateReportPayload): ReportPreview {
    switch (payload.module) {
        case "ATTENDANCE":
            return getAttendancePreview(payload);
        case "LEAVE":
            return {
                employeeName: fullName(employee.firstname, employee.lastname),
                reportLabel: "Leave",
                dateLabel: formatDate(payload.period.year, payload.period.month, 5),
                columns: ["Date", "Leave Type", "Days", "Status"],
                rows: [
                    {
                        Date: formatDate(payload.period.year, payload.period.month, 5),
                        "Leave Type": "Vacation Leave",
                        Days: 2,
                        Status: "Approved",
                    },
                ],
            };
        case "CASH_ADVANCE":
            return getTransactionPreview(payload, "CASH_ADVANCE");
        case "REIMBURSEMENT":
            return getTransactionPreview(payload, "REIMBURSEMENT");
    }
}
