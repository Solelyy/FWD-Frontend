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
    const baseButtonStyle = "w-full rounded-full border bg-background"

    return (
        <div className="grid w-full grid-cols-4 gap-2">
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
