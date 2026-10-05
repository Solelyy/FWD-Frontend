import type { ModuleKey } from "../types/report-builder";

type ReportFilter = {
    module: ModuleKey;
    year: number;
    month: number;
    cutoff: string;
    week: string;
};

function isCurrentMonth(year: number, month: number, today: Date) {
    return year === today.getFullYear() && month === today.getMonth();
}

export function getReportAvailabilityMessage({
    module,
    year,
    month,
    cutoff,
    week,
}: ReportFilter, today = new Date()): string | null {
    const selectedDate = new Date(year, month, 1);
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    if (selectedDate > currentMonth) {
        return "This report is not available yet because the selected period is in the future.";
    }

    if (!isCurrentMonth(year, month, today)) {
        return null;
    }

    if (module === "ATTENDANCE") {
        const cutoffDay = cutoff === "30" ? 30 : 15;

        if (today.getDate() < cutoffDay) {
            return `The ${cutoff}th cutoff is not complete yet. Please wait until the cutoff period ends.`;
        }
    }

    if ((module === "CASH_ADVANCE" || module === "REIMBURSEMENT") && Number(week) * 7 > today.getDate()) {
        return `Week ${week} is not complete yet. Please select a completed week.`;
    }

    return null;
}
