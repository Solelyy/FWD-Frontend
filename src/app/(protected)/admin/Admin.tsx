"use client"

import {useUser} from "@/components/providers/UserContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccountsTable from "@/features/account-management/components/AccountsTable";
import { UserRole } from "@/lib/types/roles";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link"
import { useEffect, useState } from "react";
import DataPolicyDialog from "@/features/dashboard/components/DataPolicyDialog";
import Greeting from "@/lib/components/Greeting";
import { useAdminDashboardSummary } from "@/features/dashboard/components/admin/hooks/useAdminDashboardSummary";
import AdminCards from "@/features/dashboard/components/admin/components/AdminCards";
import { useAccounts } from "@/features/account-management/hooks/useAccount";
import { ChartNoAxesCombined, FileBarChart } from "lucide-react";
import SuperAdminTrendPreview from "@/features/dashboard/components/super-admin/SuperAdminTrendPreview";

export default function AdminDashboard() {
    const [ openDataPolicy, setOpenDataPolicy ] = useState(false);
    const { user, isLoadingUser } = useUser();
    const shouldShowPolicy = !isLoadingUser && user?.isDataPolicyAccepted === false;

    const today = new Date;
    const month = today.getMonth();
    const year= today.getFullYear();
    const day= today.getDate();

    const {data: summary } = useAdminDashboardSummary({month, day, year});

    const { data: employees = []} = useAccounts(UserRole.EMPLOYEE);

    const previewEmployeeAccounts = [
        ...(employees?.slice(0,5) || [])
    ];

    const tableContainerStyle = "flex flex-col w-full gap-6";
    const cardHeaderStyle = "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between";

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

            {/*cards */}
            <AdminCards data={summary} />

            <div className={tableContainerStyle}>
                <Card className="overflow-hidden border-primary/20">
                    <CardHeader className={`${cardHeaderStyle} border-b`}>
                        <div className="flex items-center gap-3">
                            <div className="rounded-md border border-primary/20 bg-primary/10 p-2 text-primary">
                                <ChartNoAxesCombined className="h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle>Trend Analysis</CardTitle>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Review workforce activity and performance over time.
                                </p>
                            </div>
                        </div>
                        <Link href="/admin/trend-analysis">
                            <Button variant="secondary">View All</Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="pt-5">
                        <SuperAdminTrendPreview />
                    </CardContent>
                </Card>

                <Card className="overflow-hidden border-border/80">
                    <CardHeader className={cardHeaderStyle}>
                        <div className="flex items-center gap-3">
                            <div className="rounded-md border border-amber-500/20 bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                                <FileBarChart className="h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle>Reports</CardTitle>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Access attendance, leave, cash advance, and reimbursement reports.
                                </p>
                            </div>
                        </div>
                        <Link href="/admin/reports">
                            <Button variant="secondary">View Reports</Button>
                        </Link>
                    </CardHeader>
                </Card>

                {/* Employee accounts table */}
                <Card className="flex-1 overflow-hidden">
                    <CardHeader className={cardHeaderStyle}>
                        <CardTitle>Employee Accounts</CardTitle>
                            <Link href="/admin/employees">
                                <Button variant="secondary">View Full</Button>
                            </Link>               
                    </CardHeader>
                            
                    <DropdownMenuSeparator className="m-0"/>
                    <CardContent className="pt-2">
                        <AccountsTable 
                            accounts={previewEmployeeAccounts}
                            showAction={true}
                            tableType={UserRole.EMPLOYEE}
                            visibleColumns={["id", "name", "status",]}
                            isInDashboard={true}
                            alignActions={true}
                        />
                    </CardContent>
                </Card>                
            </div>
        </div>

        {shouldShowPolicy && (
            <DataPolicyDialog 
                open={openDataPolicy} 
                setOpen={setOpenDataPolicy}
                role={user?.role}
            />
        )}
    </>
    );
}