import { API_BASE_URL } from "@/lib/util/api";

import { getMockReportPreview } from "../mock-data/report-preview";
import type { GenerateReportPayload, ReportPreview } from "../types/report-builder";
import { normalizeReportRows } from "../utils/report-format";

export async function previewReportApi(payload: GenerateReportPayload): Promise<ReportPreview> {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        return getMockReportPreview(payload);
    }

    const response = await fetch(`${API_BASE_URL}/employee/reports/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(result?.message || "Unable to generate report preview.");
    }

    if (
        !result ||
        typeof result !== "object" ||
        !Array.isArray(result.columns) ||
        !Array.isArray(result.rows) ||
        typeof result.employeeName !== "string" ||
        typeof result.reportLabel !== "string" ||
        typeof result.dateLabel !== "string"
    ) {
        throw new Error("The report preview response has an invalid format.");
    }

    return {
        ...result,
        rows: normalizeReportRows(result.rows),
    } satisfies ReportPreview;
}
