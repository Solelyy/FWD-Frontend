"use client"

import { useUser } from "@/components/providers/UserContext"
import CoWorkers from "@/features/dashboard/components/employee/CoWorkers";
import QuickActions from "@/features/dashboard/components/employee/QuickActions";
import Requests from "@/features/dashboard/components/employee/Requests";
import TimeinOut from "@/features/dashboard/components/employee/TimeInOut";
import { useState, useEffect } from "react";
import DataPolicyDialog from "@/features/dashboard/components/DataPolicyDialog";
import ReimbursementDialog from "./reimbursement/components/ReimbursementDialog";
import CashAdvanceDialog from "./cash-advance/components/CashAdvanceDialog";
import LeaveDialog from "./leave/components/LeaveDialog";
import Greeting from "@/lib/components/Greeting";

export default function EmployeeDashboard() {
    const { user, isLoadingUser } = useUser();
    const [ openDataPolicy, setOpenDataPolicy ] = useState(false);
    const [showReimbursementDialog, setShowReimbursementDialog] = useState(false);
    const [showCADialog, setShowCADialog] = useState(false);
    const [showLeaveDialog, setShowLeaveDialog] = useState(false);

    const shouldShowPolicy = !isLoadingUser && user?.isDataPolicyAccepted === false;


    console.log("isDataPolicyAccepted: ", user?.isDataPolicyAccepted);

    useEffect(() => {
        if (shouldShowPolicy) {
            setOpenDataPolicy(true);
        }
    }, [shouldShowPolicy]);


    return(
    <>
        <div className="flex flex-col gap-6">
            <Greeting firstname={user?.firstname} role={user?.role} animated className="text-xl font-medium" />

            {/* Quick actions */}
            <QuickActions 
                openReimbursment={showReimbursementDialog} 
                onOpenReimbursementChange={setShowReimbursementDialog}
                openCashAdvance={showCADialog}
                onOpenCashAdvanceChange={setShowCADialog}
                openLeave={showLeaveDialog}
                onOpenLeaveChange={setShowLeaveDialog}
            />

            <div className="flex flex-col md:flex-row gap-8 items-stretch">
                <TimeinOut />
                <Requests />
            </div>

            <CoWorkers />
        </div>

        {openDataPolicy && (
            <DataPolicyDialog 
                open={openDataPolicy} 
                setOpen={setOpenDataPolicy}
                role={user?.role}
            />
        )}

        <ReimbursementDialog open={showReimbursementDialog} setOpen={setShowReimbursementDialog}/>
        <CashAdvanceDialog open={showCADialog} setOpen={setShowCADialog}/>
        <LeaveDialog open={showLeaveDialog} setOpen={setShowLeaveDialog}/>
    </>
    );
}