import { API_BASE_URL } from "@/lib/util/api";
import type { GenerateReportPayload, FileType } from "../types/report-builder";

export async function exportReportApi( payload: GenerateReportPayload, fileType: FileType) {
    const endpoint = "/"
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...payload, fileType,}),
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