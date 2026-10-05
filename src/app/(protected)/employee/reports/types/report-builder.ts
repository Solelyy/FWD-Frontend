import type { LucideIcon } from "lucide-react";
import { CalendarCheck, Calendar1 , PhilippinePeso, Wallet} from "lucide-react";

export type ModuleKey = "ATTENDANCE" | "LEAVE" | "CASH_ADVANCE" | "REIMBURSEMENT";

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

export const moduleOptions: ModuleOption[] = [
    {
        value: "ATTENDANCE",
        label: "Attendance Report",
        description: "Coverage by payroll cutoff date.",
        icon: CalendarCheck,
    },
    {
        value: "LEAVE",
        label: "Leave Report",
        description: "Annual report for all approved and pending leave requests.",
        icon: Calendar1,
    },
    {
        value: "CASH_ADVANCE",
        label: "Cash Advance Report",
        description: "Weekly summary of requested and approved cash advances.",
        icon: PhilippinePeso,
    },
    {
        value: "REIMBURSEMENT",
        label: "Reimbursement Report",
        description: "Weekly report for reimbursement claims and release status.",
        icon: Wallet,
    },
];

export const weekOptions: WeekOption[] = [
    { value: "1", label: "Week 1" },
    { value: "2", label: "Week 2" },
    { value: "3", label: "Week 3" },
    { value: "4", label: "Week 4" },
];

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

export type FileType = "pdf" | "csv" | "xlsx";

export type ReportPreview = {
    employeeName: string;
    reportLabel: string;
    dateLabel: string;
    columns: string[];
    rows: Array<Record<string, string | number | null>>;
    totals?: Array<{ label: string; value: string | number }>;
};