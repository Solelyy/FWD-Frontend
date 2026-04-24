import { Button } from "@/components/ui/button";
import { Clock, Calendar, PhilippinePeso, Wallet } from "lucide-react";
import Link from "next/link";

type Props = {
    openReimbursment: boolean;
    onOpenReimbursementChange: (openReimbursement: boolean) => void;
    openCashAdvance: boolean;
    onOpenCashAdvanceChange: (openCashAdvance: boolean) => void;
    openLeave: boolean;
    onOpenLeaveChange: (openLeave: boolean) => void;
}
export default function QuickActions({ onOpenReimbursementChange,onOpenCashAdvanceChange,onOpenLeaveChange}: Props) {
    const style = "w-full sm:auto";

    
    return (
        <div className="flex flex-col gap-4">
            <p className="font-light text-sm">Quick Actions</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ">
                    <Link href="employee/attendance">
                        <Button className={style} variant="outline">
                            <Clock />
                            View Attendance Logs
                        </Button>
                    </Link>
                        
                    <Button 
                        className={style} 
                        variant="outline"
                        onClick={() => onOpenReimbursementChange(true)}
                    >
                        <Wallet />
                        Submit Reimbursement
                    </Button>
                        
                    <Button 
                        className={style} 
                        variant="outline"
                        onClick={() => onOpenCashAdvanceChange(true)}
                    >
                        <PhilippinePeso />
                        Request Cash Advance
                    </Button>
    
                    <Button 
                        className={style} 
                        variant="outline"
                        onClick={() => onOpenLeaveChange(true)}
                    >
                        <Calendar />
                        File Leave
                    </Button>
                </div>
        </div>
    );
}