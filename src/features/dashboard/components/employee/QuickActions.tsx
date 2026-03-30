import { Button } from "@/components/ui/button";
import { Clock, Calendar, PhilippinePeso, Wallet } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
    const style = "w-full sm:auto";
    return (
        <div className="fle flex-col gap-4 ">
            <p className="font-light text-sm mb-2">Quick Actions</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ">
                    <Link href="employee/attendance">
                        <Button className={style} variant="outline">
                            <Clock />
                            View Attendance Logs
                        </Button>
                    </Link>
                        
                    <Button className={style} variant="outline">
                        <Wallet />
                        Submit Reimbursement
                    </Button>
                        
                    <Button className={style} variant="outline">
                        <PhilippinePeso />
                        Request Cash Advance
                    </Button>
    
                    <Button className={style} variant="outline">
                        <Calendar />
                        File Leave
                    </Button>
                </div>
        </div>
    );
}