import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { ReportPreview } from "../types/report-builder";

type ReportPreviewTableProps = {
    preview: ReportPreview;
};

const currencyFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
});

function formatValue(value: string | number | null, label: string) {
    if (typeof value === "number" && (label === "Amount" || label.includes("Cash Advance") || label.includes("Reimbursement"))) {
        return currencyFormatter.format(value);
    }

    return value ?? "-";
}

export default function ReportPreviewTable({ preview }: ReportPreviewTableProps) {
    if (preview.rows.length === 0) {
        return (
            <div className="rounded-lg border border-dashed p-10 text-center">
                <p className="text-sm font-medium">No records found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting the selected report filters.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border">
            <div className="flex items-center justify-between border-b bg-muted/20 px-4 py-3">
                <div>
                    <p className="text-base font-semibold">{preview.employeeName}</p>
                    <p className="text-sm text-muted-foreground">
                        Report: {preview.reportLabel}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Date: {preview.dateLabel}
                    </p>
                </div>
                <span className="text-sm text-muted-foreground">{preview.rows.length} records</span>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        {preview.columns.map((column) => (
                            <TableHead key={column} className="whitespace-nowrap bg-muted/40 px-4 py-3 text-xs uppercase tracking-wide">
                                {column}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {preview.rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex} className="transition-colors hover:bg-muted/30">
                            {preview.columns.map((column) => (
                                <TableCell
                                    key={`${rowIndex}-${column}`}
                                    className="whitespace-nowrap px-4 py-3 text-sm"
                                >
                                    {formatValue(row[column], column)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
            {preview.totals && preview.totals.length > 0 && (
                <div className="grid gap-3 border-t bg-muted/20 p-4 sm:grid-cols-3">
                    {preview.totals.map((total) => (
                        <div key={total.label}>
                            <p className="text-xs text-muted-foreground">{total.label}</p>
                            <p className="text-lg font-semibold">{formatValue(total.value, total.label)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
