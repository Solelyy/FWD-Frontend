"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddAccountDialog } from "@/features/account-management/components/AddAccountDialog";
import { UserRole } from "@/lib/types/roles";
import { useAccounts } from "@/features/account-management/hooks/useAccount";
import AccountsTable from "@/features/account-management/components/AccountsTable";

export default function EmployeeManagement() {
    const [ open, setOpen ] = useState(false);
    const {data: accounts =[], isLoading, error } = useAccounts(UserRole.EMPLOYEE);
    
    return(
        <ContentLayout title="Employee Management">
            <div className="flex flex-col gap-8">
                <div className="flex justify-end">
                    <Button onClick= {() => setOpen(true)}>
                        Add Employee
                    </Button>
                </div>

                <AccountsTable 
                    accounts={accounts}
                    loading= {isLoading}
                    error= {!!error}
                    showAction= {true}
                />
                
                <AddAccountDialog open= {open} setOpen= {setOpen} role= {UserRole.EMPLOYEE}/>
            </div>
        </ContentLayout>
    );
}