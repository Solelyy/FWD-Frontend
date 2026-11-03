"use client";

import { useUser } from "@/components/providers/UserContext";
import CoWorkers from "@/features/dashboard/components/employee/components/CoWorkers";
import QuickActions from "@/features/dashboard/components/employee/components/QuickActions";
import Requests from "@/features/dashboard/components/employee/components/Requests";
import TimeinOut from "@/features/dashboard/components/employee/components/TimeInOut";
import { useState, useEffect } from "react";
import DataPolicyDialog from "@/features/dashboard/components/DataPolicyDialog";
import ReimbursementDialog from "./reimbursement/components/ReimbursementDialog";
import CashAdvanceDialog from "./cash-advance/components/CashAdvanceDialog";
import LeaveDialog from "./leave/components/LeaveDialog";
import Greeting from "@/lib/components/Greeting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartNoAxesCombined } from "lucide-react";
import Link from "next/link";
import EmployeeTrendPreview from "@/features/dashboard/components/employee/EmployeeTrendPreview";
import EmployeeCards from "@/features/dashboard/components/employee/EmployeeCards";

export default function EmployeeDashboard() {
  const { user, isLoadingUser } = useUser();
  const [openDataPolicy, setOpenDataPolicy] = useState(false);
  const [showReimbursementDialog, setShowReimbursementDialog] = useState(false);
  const [showCADialog, setShowCADialog] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);

  const shouldShowPolicy =
    !isLoadingUser && user?.isDataPolicyAccepted === false;

  console.log("isDataPolicyAccepted: ", user?.isDataPolicyAccepted);

  useEffect(() => {
    if (shouldShowPolicy) {
      setOpenDataPolicy(true);
    }
  }, [shouldShowPolicy]);

  return (
    <>
      <div className="flex flex-col gap-6 lg:gap-8">
        <Greeting
          firstname={user?.firstname}
          role={user?.role}
          animated
          className="text-xl font-medium"
        />

        <EmployeeCards />

        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          <TimeinOut />
          <Requests />
        </div>

        {/* Quick actions */}
        <QuickActions
          openReimbursment={showReimbursementDialog}
          onOpenReimbursementChange={setShowReimbursementDialog}
          openCashAdvance={showCADialog}
          onOpenCashAdvanceChange={setShowCADialog}
          openLeave={showLeaveDialog}
          onOpenLeaveChange={setShowLeaveDialog}
        />

        <Card className="overflow-hidden border-primary/20">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-md border border-primary/20 bg-primary/10 p-2 text-primary">
                <ChartNoAxesCombined className="h-5 w-5" />
              </div>
              <div>
                <CardTitle> My Trend Analysis</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Review personal activity and performance over time.
                </p>
              </div>
            </div>
            <Link href="/employee/trend-analysis" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-5">
            <EmployeeTrendPreview />
          </CardContent>
        </Card>

        <CoWorkers />
      </div>

      {openDataPolicy && (
        <DataPolicyDialog
          open={openDataPolicy}
          setOpen={setOpenDataPolicy}
          role={user?.role}
        />
      )}

      <ReimbursementDialog
        open={showReimbursementDialog}
        setOpen={setShowReimbursementDialog}
      />
      <CashAdvanceDialog open={showCADialog} setOpen={setShowCADialog} />
      <LeaveDialog open={showLeaveDialog} setOpen={setShowLeaveDialog} />
    </>
  );
}
