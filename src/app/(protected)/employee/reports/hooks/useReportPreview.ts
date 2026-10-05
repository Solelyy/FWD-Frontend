import { useMutation } from "@tanstack/react-query";

import { previewReportApi } from "../api/previewReportApi";

export function useReportPreview() {
    return useMutation({
        mutationFn: previewReportApi,
    });
}
