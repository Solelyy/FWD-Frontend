import { Button } from "@/components/ui/button"
import { CalendarCheck, Calendar1, PhilippinePeso, Wallet } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type ReportFilter = "attendance" | "reimbursement" | "cash-advance" | "leave"

type FilterButtonsProps = {
    activeFilter: ReportFilter
    onFilterChange: (filter: ReportFilter) => void
}

const filters: { key: ReportFilter; label: string; icon: LucideIcon }[] = [
    { key: "attendance", label: "Attendance", icon: CalendarCheck },
    { key: "leave", label: "Leave", icon: Calendar1 },
    { key: "cash-advance", label: "Cash Advance", icon: PhilippinePeso },
    { key: "reimbursement", label: "Reimbursement", icon: Wallet },
    
]

export default function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
    const buttonStyle = "rounded flex-1 h-auto py-3"
    
    return (
        <div className="flex flex-wrap gap-2 items-center">
            {filters.map((filter) => {
                const isActive = activeFilter === filter.key
                const Icon = filter.icon

                return (
                    <Button
                        key={filter.key}
                        variant="outline"
                        size="sm"
                        className={`${buttonStyle} ${isActive ? "border-primary dark:border-primary hover:bg-primary/5" : ""}`}
                        onClick={() => onFilterChange(filter.key)}
                    >
                        <span className="flex flex-col items-center gap-1">
                            <Icon className={`h-4 w-4 ${isActive ? "text-primary dark:text-primary" : "text-muted-foreground"}`} />
                            <span className={isActive ? "text-primary dark:text-primary" : "text-foreground"}>{filter.label}</span>
                        </span>
                    </Button>
                )
            })}
        </div>
    )
}