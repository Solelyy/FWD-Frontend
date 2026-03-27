"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
import { CardLayout } from "@/features/dashboard/components/CardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound, CalendarCheck, CalendarDays, Wallet, PhilippinePeso } from "lucide-react";
import { useAdminDashboardStats } from "@/features/dashboard/hooks/useAdminDashboardState";
import AccountsTable from "@/features/account-management/components/AccountsTable";
import { UserRole } from "@/lib/types/roles";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link"

export default function AdminDashboard() {
    const { user } = useUser();
    const { employees, totalEmployees, isLoading, 
        presentToday, onLeave, cashAdvance, reimbursement } = useAdminDashboardStats();

    const previewEmployeeAccounts = [
        ...(employees?.slice(0,5) || [])
    ];

    const tableContainerStyle = "flex flex-col sm:flex-row w-full gap-4 justify-between";
    const cardHeaderStyle = "flex justify-between items-center";

    return(
    <ContentLayout title="Dashboard">
        <div className="flex flex-col gap-6">
            <p className="text-xl font-medium">Good Day, {user?.firstname}!</p>

            {/*cards */}
            <div className="flex justify-between gap-4">
                <CardLayout 
                    title="Total Admins"
                    icon= {<UsersRound />}
                    dataCount={totalEmployees}
                    isLoading = {isLoading}
                />

                <CardLayout 
                    title="Present Today"
                    icon = {<CalendarCheck />}
                    dataCount={presentToday}
                    isLoading= {isLoading}
                />

                <CardLayout 
                    title="On Leave"
                    icon = {<CalendarDays />}
                    dataCount={onLeave}
                    isLoading= {isLoading}
                />

                <CardLayout 
                    title="Reimbursement"
                    icon = {<PhilippinePeso />}
                    dataCount={reimbursement}
                    isLoading= {isLoading}
                />

                <CardLayout 
                    title="Cash Advance"
                    icon = {<Wallet />}
                    dataCount={cashAdvance}
                    isLoading= {isLoading}
                />  
            </div>

            <div className={tableContainerStyle}>
                {/* Employee accounts table */}
                <Card className="flex-1">
                    <CardHeader className={cardHeaderStyle}>
                        <CardTitle>Employee Accounts</CardTitle>
                            <Link href="/admin/employees">
                                <Button variant="ghost">View Full</Button>
                            </Link>               
                    </CardHeader>
                            
                    <DropdownMenuSeparator className="p-0 m-0"/>
                    <CardContent>
                        <AccountsTable 
                            accounts={previewEmployeeAccounts}
                            loading={isLoading}
                            showAction={true}
                            tableType={UserRole.EMPLOYEE}
                            visibleColumns={["id", "name", "status",]}
                        />
                    </CardContent>
                </Card>

                {/* Attendance table */}
                
            </div>
        </div>
    </ContentLayout>
    );
}