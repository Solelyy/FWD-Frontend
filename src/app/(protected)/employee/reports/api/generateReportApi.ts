import type { GenerateReportPayload, FileType } from "../types/report-builder";

export async function exportReportApi(payload: GenerateReportPayload, fileType: FileType) {
    const response = await fetch(`/api/employee/reports/export`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...payload, fileType }),
    });

    if (!response.ok) {
        throw new Error("Failed to export report");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `report.${fileType}`;
    a.click();

    window.URL.revokeObjectURL(url);
}