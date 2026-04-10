import { Button } from "@/components/ui/button"

export default function FilterButtons() {
    const buttonStyle = "border rounded-full flex-1"
    return (
        <div className="flex flex-wrap gap-2 items-center">
            <Button variant="outline" size="sm" className={buttonStyle}>
                All
            </Button>

            <Button variant="outline" size="sm" className={buttonStyle}>
                Present
            </Button>

            <Button variant="outline" size="sm" className={buttonStyle}>
                Absent
            </Button>

            <Button variant="outline" size="sm" className={buttonStyle}>
                On Leave
            </Button>

            <Button variant="outline" size="sm" className={buttonStyle}>
                Overtime Request
            </Button>

            <Button variant="outline" size="sm" className={buttonStyle}>
                Missing Timeout
            </Button>
        </div>
    )
}