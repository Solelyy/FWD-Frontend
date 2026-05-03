import type { GenerateReportPayload, ModuleKey } from "../types/report-builder";

type BuildGenerateReportPayloadInput = {
    selectedModule: ModuleKey;
    selectedYear: number;
    selectedMonth: number;
    attendanceCutoff: string;
    cashAdvanceWeek: string;
    reimbursementWeek: string;
};

export function buildGenerateReportPayload({
    selectedModule,
    selectedYear,
    selectedMonth,
    attendanceCutoff,
    cashAdvanceWeek,
    reimbursementWeek,
}: BuildGenerateReportPayloadInput): GenerateReportPayload {
    const period = {
        year: selectedYear,
        month: selectedMonth + 1,
    };

    if (selectedModule === "ATTENDANCE") {
        return {
            module: selectedModule,
            period,
            filter: {
                type: "cutoff",
                value: attendanceCutoff === "30" ? "30" : "15",
            },
        };
    }

    if (selectedModule === "CASH_ADVANCE") {
        return {
            module: selectedModule,
            period,
            filter: {
                type: "week",
                value: cashAdvanceWeek,
            },
        };
    }

    if (selectedModule === "REIMBURSEMENT") {
        return {
            module: selectedModule,
            period,
            filter: {
                type: "week",
                value: reimbursementWeek,
            },
        };
    }

    return {
        module: selectedModule,
        period,
        filter: {
            type: "year",
        },
    };
}
