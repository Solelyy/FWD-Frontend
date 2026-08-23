import { Button } from "@/components/ui/button"

export type ReportFilter = "attendance" | "reimbursement" | "cash-advance" | "leave"

type FilterButtonsProps = {
    activeFilter: ReportFilter
    onFilterChange: (filter: ReportFilter) => void
}

const filters: { key: ReportFilter; label: string }[] = [
    { key: "attendance", label: "Attendance" },
    { key: "reimbursement", label: "Reimbursement" },
    { key: "cash-advance", label: "Cash Advance" },
    { key: "leave", label: "Leave" },
]

export default function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
    const buttonStyle = "border rounded flex-1"
    
    return (
        <div className="flex flex-wrap gap-2 items-center">
            {filters.map((filter) => {
                const isActive = activeFilter === filter.key

                return (
                    <Button
                        key={filter.key}
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        className={buttonStyle}
                        onClick={() => onFilterChange(filter.key)}
                    >
                        {filter.label}
                    </Button>
                )
            })}
        </div>
    )
}