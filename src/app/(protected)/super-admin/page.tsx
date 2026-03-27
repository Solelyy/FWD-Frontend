"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
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

export default function SuperAdminDashboard() {
    const { user } = useUser();
    const { admins, employees, totalAdmins, totalEmployees, activeAccounts, isLoading} = useSuperAdminDashboardStats();

    const previewAdminAccounts = [
        ...(admins?.slice(0,5) || []),
    ];

    const previewEmployeeAccounts = [
        ...(employees?.slice(0,5) || []),
    ];

    const tableContainerStyle = "flex flex-col sm:flex-row w-full gap-4 justify-between";
    const cardHeaderStyle = "flex justify-between items-center";

    return(
    <ContentLayout title="Dashboard">
        <div className="flex flex-col gap-6">
            <p className="text-xl font-medium">Good Day, {user?.firstname}!</p>
            
            <div className="flex justify-between gap-4">
                <CardLayout 
                title="Total Admins"
                icon= {<UsersRound />}
                dataCount={totalAdmins}
                isLoading = {isLoading}
                />

                <CardLayout 
                title="Total Employees"
                icon= {<UsersRound/>}
                dataCount={totalEmployees}
                isLoading = {isLoading}
                />

                <CardLayout 
                title="Active Accounts"
                icon= {<UsersRound/>}
                dataCount={activeAccounts}
                isLoading = {isLoading}
                />
            </div>
            
            {/*tables */}
            
            <div className={tableContainerStyle}>
                <Card className="flex-1">
                    <CardHeader className={cardHeaderStyle}>
                        <CardTitle>Admin Accounts</CardTitle>
                        <Link href="/super-admin/admin-management">
                            <Button variant="ghost">View Full</Button>
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
                        />
                    </CardContent>
                </Card>
                
                <Card className="flex-1">
                    <CardHeader className={cardHeaderStyle}>
                        <CardTitle>Employee Accounts</CardTitle>
                        <Link href="/super-admin/employee-management">
                            <Button variant="ghost">View Full</Button>
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
                        />
                    </CardContent>
                </Card>
                
            </div>
        </div>
    </ContentLayout>
    );
}