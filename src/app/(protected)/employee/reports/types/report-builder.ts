import type { LucideIcon } from "lucide-react";

export type ModuleKey = "attendance" | "leave" | "cashAdvance" | "reimbursement";

export type ModuleOption = {
    value: ModuleKey;
    label: string;
    description: string;
    icon: LucideIcon;
};

export type WeekOption = {
    value: string;
    label: string;
};

export type GenerateReportPayload = {
    module: ModuleKey;
    period: {
        year: number;
        month: number;
    };
    filter:
        | { type: "cutoff"; value: "15" | "30" }
        | { type: "week"; value: string }
        | { type: "year" };
};
