"use client"

import {useUser} from "@/components/providers/UserContext"
import { CardLayout } from "@/features/dashboard/components/CardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound, CalendarCheck, CalendarDays, Wallet, PhilippinePeso } from "lucide-react";
import AccountsTable from "@/features/account-management/components/AccountsTable";
import { UserRole } from "@/lib/types/roles";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link"
import { useEffect, useState } from "react";
import DataPolicyDialog from "@/features/dashboard/components/DataPolicyDialog";
import { useAdminDashboardSummary } from "@/features/dashboard/hooks/useAdminDashboardSummary";
import { useAdminDashboardStats } from "@/features/dashboard/hooks/useAdminDashboardStats";

export default function AdminDashboard() {
    const [ openDataPolicy, setOpenDataPolicy ] = useState(false);
    const { user, isLoadingUser } = useUser();
    const shouldShowPolicy = !isLoadingUser && user?.isDataPolicyAccepted === false;

    /*
    const today = new Date;
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const [day, setDay] = useState(today.getDate());

    const {data: summary, isLoading, error } = useAdminDashboardSummary({month, day, year});
    */

    const { employees, totalEmployees, isLoading, 
        presentToday, onLeave, cashAdvance, reimbursement } = useAdminDashboardStats();

    const previewEmployeeAccounts = [
        ...(employees?.slice(0,5) || [])
    ];

    const tableContainerStyle = "flex flex-col sm:flex-row w-full gap-4 justify-between";
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

            {/*cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <CardLayout 
                    title="Total Employees"
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
                    icon = {<Wallet />}
                    dataCount={reimbursement}
                    isLoading= {isLoading}
                />

                <CardLayout 
                    title="Cash Advance"
                    icon = {<PhilippinePeso />}
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
                                <Button variant="secondary">View Full</Button>
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
                            isInDashboard={true}
                        />
                    </CardContent>
                </Card>

                {/* Attendance table */}
                
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