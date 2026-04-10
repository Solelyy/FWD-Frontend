import { Button } from "@/components/ui/button"

export default function FilterButtons() {
    const buttonStyle = "border rounded-full flex-1"
    return (
        <div className="flex flex-wrap gap-2 items-center">
            <Button variant="outline" size="sm" className={buttonStyle}>
                All
            </Button>

            <Button variant="outline" size="sm" className={buttonStyle}>
                Pending
            </Button>

            <Button variant="outline" size="sm" className={buttonStyle}>
                Approved
            </Button>

            <Button variant="outline" size="sm" className={buttonStyle}>
                Rejected
            </Button>
        </div>
    )
}