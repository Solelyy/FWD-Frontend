"use client"

import {useUser} from "@/components/providers/UserContext"
import AccountsTable from "@/features/account-management/components/AccountsTable";
import { CardLayout } from "@/features/dashboard/components/CardLayout";
import { useSuperAdminDashboardStats } from "@/features/dashboard/hooks/useSuperAdminDashboardStats";
import { UserRole } from "@/lib/types/roles";
import { UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link"
import { useState, useEffect } from "react";
import DataPolicyDialog from "@/features/dashboard/components/DataPolicyDialog";
import SuperAdminCards from "@/features/dashboard/components/super-admin/SuperAdminCards";

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

    const tableContainerStyle = "flex flex-col flex-wrap sm:flex-row w-full gap-4 justify-between";
    const cardHeaderStyle = "flex justify-between items-center";

    console.log("isDataPolicyAccepted: ", user?.isDataPolicyAccepted);

    useEffect(() => {
        if (shouldShowPolicy) {
            setOpenDataPolicy(true);
        }
    }, [shouldShowPolicy]);

    return(
    <>
        <div className="flex flex-col gap-6">
            <p className="text-xl font-medium">Good Day, {user?.firstname}!</p>
            
            <SuperAdminCards totalAdmins={totalAdmins} totalEmployees={totalEmployees} activeAccounts={activeAccounts}/>
            
            {/*tables */}
            
            <div className={tableContainerStyle}>
                <Card className="flex-1">
                    <CardHeader className={cardHeaderStyle}>
                        <CardTitle>Admin Accounts</CardTitle>
                        <Link href="/super-admin/admin-management">
                            <Button variant="secondary">View Full</Button>
                        </Link>
                        
                    </CardHeader>
                    
                    <DropdownMenuSeparator className="p-0 m-0"/>
                    <CardContent>
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
                
                <Card className="flex-1">
                    <CardHeader className={cardHeaderStyle}>
                        <CardTitle>Employee Accounts</CardTitle>
                        <Link href="/super-admin/employee-management">
                            <Button variant="secondary">View Full</Button>
                        </Link>
                        
                    </CardHeader>
                    
                    <DropdownMenuSeparator className="p-0 m-0"/>
                    <CardContent>
                        <AccountsTable 
                            accounts={previewEmployeeAccounts}
                            loading={isLoading}
                            showAction={false}
                            tableType={UserRole.EMPLOYEE}
                            visibleColumns={["id", "name", "status",]}
                            isInDashboard={true}
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