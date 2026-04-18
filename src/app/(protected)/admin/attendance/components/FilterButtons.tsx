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
    const buttonStyle = "border rounded-full flex-1"
    return (
        <div className="flex flex-wrap gap-2 items-center">
            {filters.map((f)=> (
                <Button
                    key={f.value}
                    size="sm"
                    className={buttonStyle}
                    variant={filter === f.value ? "default" : "outline"}
                    onClick={() => onFilterChange(f.value)}
                >
                    {f.label}
                </Button>
            ))}
        </div>
    );
}
