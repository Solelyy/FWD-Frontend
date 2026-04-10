import LeaveTableWrapper from "./components/LeaveTableWrapper";
import { Button } from "@/components/ui/button";
import { UserRoundPen } from "lucide-react";
export default function LeaveManagement() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end">
                <Button>
                    <UserRoundPen />
                    Generate New Year Balances
                </Button>
            </div>
            
            <LeaveTableWrapper/>
        </div>
    )
}