"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddAccountDialog } from "@/features/account-management/components/AddAccountDialog";
import { UserRole } from "@/lib/types/roles";
import { useAccounts } from "@/features/account-management/hooks/useAccount";
import AccountsTable from "@/features/account-management/components/AccountsTable";
import { UserRoundPlus, UsersRound } from "lucide-react";
import EmployeesCards from "./components/EmployeesCard";
import { useEmployeesSummary } from "./hooks/useEmployeesSummary";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Employees() {
    const [ open, setOpen ] = useState(false);
    const {data: accounts =[], isLoading, error } = useAccounts(UserRole.EMPLOYEE);
    const {data: summary, } = useEmployeesSummary();
    
    return(
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <EmployeesCards data={summary}/>
            <div className="flex flex-col gap-4">
                <Card className="gap-0 overflow-hidden">
                    <CardHeader className="grid grid-cols-[auto_minmax(0,1fr)_auto] grid-rows-[auto_auto] items-center gap-x-3 gap-y-1 px-6 py-4">
                        <span className="col-start-1 row-span-2 row-start-1 inline-flex rounded-md border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                            <UsersRound className="h-5 w-5" />
                        </span>
                        <CardTitle className="col-start-2 row-start-1 min-w-0 text-base">Need to add a new employee account?</CardTitle>
                        <CardDescription className="col-start-2 row-start-2 min-w-0 truncate">Use the Add Employee button to create an account and include them in this list.</CardDescription>
                        <Button className="col-start-3 row-span-2 row-start-1 shrink-0" onClick= {() => setOpen(true)}>
                            <UserRoundPlus />
                            Add Employee
                        </Button>
                    </CardHeader>
                </Card>
                    

                <AccountsTable 
                    accounts={accounts}
                    loading= {isLoading}
                    error= {!!error}
                    showAction= {true}
                    tableType={UserRole.EMPLOYEE}
                    isInDashboard={false}
                    alignActions={true}
                    alignInvitationDate={true}
                />
                    
                <AddAccountDialog open= {open} setOpen= {setOpen} role= {UserRole.EMPLOYEE}/>
            </div>
        </div>
    );
}