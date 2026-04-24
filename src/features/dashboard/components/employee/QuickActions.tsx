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
        <div className="flex flex-col gap-4 lg:gap-5">
            <p className="text-sm font-light lg:text-base">Quick Actions</p>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4 ">
                    <Link href="employee/attendance">
                        <Button className="w-full py-3 lg:h-12 lg:px-5 lg:text-base" variant="outline">
                            <Clock className="h-4 w-4 lg:h-5 lg:w-5" />
                            View Attendance Logs
                        </Button>
                    </Link>
                        
                    <Button 
                        className="w-full py-3 lg:h-12 lg:px-5 lg:text-base" 
                        variant="outline"
                        onClick={() => onOpenReimbursementChange(true)}
                    >
                        <Wallet className="h-4 w-4 lg:h-5 lg:w-5" />
                        Submit Reimbursement
                    </Button>
                        
                    <Button 
                        className="w-full py-3 lg:h-12 lg:px-5 lg:text-base" 
                        variant="outline"
                        onClick={() => onOpenCashAdvanceChange(true)}
                    >
                        <PhilippinePeso className="h-4 w-4 lg:h-5 lg:w-5" />
                        Request Cash Advance
                    </Button>
    
                    <Button 
                        className="w-full py-3 lg:h-12 lg:px-5 lg:text-base" 
                        variant="outline"
                        onClick={() => onOpenLeaveChange(true)}
                    >
                        <Calendar className="h-4 w-4 lg:h-5 lg:w-5" />
                        File Leave
                    </Button>
                </div>
        </div>
    );
}