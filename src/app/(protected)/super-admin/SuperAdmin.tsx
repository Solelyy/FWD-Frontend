"use client"

import {useUser} from "@/components/providers/UserContext"
import AccountsTable from "@/features/account-management/components/AccountsTable";
import { useSuperAdminDashboardStats } from "@/features/dashboard/hooks/useSuperAdminDashboardStats";
import { UserRole } from "@/lib/types/roles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link"
import { useState, useEffect } from "react";
import DataPolicyDialog from "@/features/dashboard/components/DataPolicyDialog";
import SuperAdminCards from "@/features/dashboard/components/super-admin/SuperAdminCards";
import Greeting from "@/lib/components/Greeting";
import { ChartNoAxesCombined, FileBarChart } from "lucide-react";
import SuperAdminTrendPreview from "@/features/dashboard/components/super-admin/SuperAdminTrendPreview";

export default function SuperAdminDashboard() {
    const [ openDataPolicy, setOpenDataPolicy ] = useState(false);

    const { user, isLoadingUser } = useUser();
    
    const shouldShowPolicy = !isLoadingUser && user?.isDataPolicyAccepted === false;

    const { admins, employees, totalAdmins, totalEmployees, activeAccounts, isLoading} = useSuperAdminDashboardStats();

    const previewAdminAccounts = [
        ...(admins?.slice(0,5) || []),
    ];

    const previewEmployeeAccounts = [
        ...(employees?.slice(0,5) || []),
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
            
            <SuperAdminCards totalAdmins={totalAdmins} totalEmployees={totalEmployees} activeAccounts={activeAccounts}/>
            
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
                        <Link href="/super-admin/trend-analysis">
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
                        <Link href="/super-admin/reports">
                            <Button variant="secondary">View Reports</Button>
                        </Link>
                    </CardHeader>
                </Card>

                <Card className="flex-1 overflow-hidden">
                    <CardHeader className={cardHeaderStyle}>
                        <CardTitle>Admin Accounts</CardTitle>
                        <Link href="/super-admin/admin-management">
                            <Button variant="secondary">View Full</Button>
                        </Link>
                        
                    </CardHeader>
                    
                    <DropdownMenuSeparator className="m-0"/>
                    <CardContent className="pt-2">
                        <AccountsTable 
                            accounts={previewAdminAccounts}
                            loading={isLoading}
                            showAction={true}
                            tableType={UserRole.ADMIN}
                            visibleColumns={["id", "name", "status",]}
                            isInDashboard={true}
                        />
                    </CardContent>
                </Card>
                
                <Card className="flex-1 overflow-hidden">
                    <CardHeader className={cardHeaderStyle}>
                        <CardTitle>Employee Accounts</CardTitle>
                        <Link href="/super-admin/employee-management">
                            <Button variant="secondary">View Full</Button>
                        </Link>
                        
                    </CardHeader>
                    
                    <DropdownMenuSeparator className="m-0"/>
                    <CardContent className="pt-2">
                        <AccountsTable 
                            accounts={previewEmployeeAccounts}
                            loading={isLoading}
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