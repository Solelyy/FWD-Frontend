import { Button } from "@/components/ui/button"
import { LeaveStatusFilter } from "../types/leave";

type Props = {
    filter: LeaveStatusFilter
    onFilterChange: (value: LeaveStatusFilter) => void;
}

const filters: {label: string, value: LeaveStatusFilter} []= [
    {label: "All", value: LeaveStatusFilter.ALL},
    {label: "Pending", value: LeaveStatusFilter.PENDING},
    {label: "Approved", value: LeaveStatusFilter.APPROVED},
    {label: "Rejected", value: LeaveStatusFilter.REJECTED},
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
