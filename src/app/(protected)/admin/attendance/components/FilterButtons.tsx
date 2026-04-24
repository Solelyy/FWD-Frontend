import { Button } from "@/components/ui/button"
import { AttendanceStatusFilter } from "../types/attendance-types"

type Props = {
    filter: AttendanceStatusFilter
    onFilterChange: (value: AttendanceStatusFilter) => void;
}

const filters: {label: string, value: AttendanceStatusFilter} []= [
    {label: "All", value:AttendanceStatusFilter.ALL},
    {label: "Present", value:AttendanceStatusFilter.PRESENT},
    {label: "Absent", value:AttendanceStatusFilter.ABSENT},
    {label: "On Leave", value:AttendanceStatusFilter.ON_LEAVE},
    {label: "Overtime Request", value:AttendanceStatusFilter.OVERTIME_REQUEST},
    {label: "Missing Timeout", value:AttendanceStatusFilter.MISSING_TIMEOUT},
];

export default function FilterButtons({filter, onFilterChange}: Props) {
    const baseButtonStyle = "w-full rounded-full border bg-background"

    return (
        <div className="grid w-full grid-cols-3 gap-2 md:grid-cols-6">
            {filters.map((f)=> (
                <Button
                    key={f.value}
                    size="sm"
                    className={`${baseButtonStyle} ${
                        filter === f.value
                            ? "border-primary dark:border-primary text-primary hover:text-primary"
                            : "border-border text-foreground"
                    }`}
                    variant="outline"
                    onClick={() => onFilterChange(f.value)}
                >
                    {f.label}
                </Button>
            ))}
        </div>
    );
}
