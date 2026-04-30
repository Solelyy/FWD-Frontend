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
            <Greeting firstname={user?.firstname} role={user?.role} animated className="text-xl font-medium" />

            {/*cards */}
            <AdminCards data={summary} />

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
                            showAction={true}
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