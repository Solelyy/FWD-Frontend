"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddAccountDialog } from "@/features/account-management/components/AddAccountDialog";
import { UserRole } from "@/lib/types/roles";
import { useAccounts } from "@/features/account-management/hooks/useAccount";
import AccountsTable from "@/features/account-management/components/AccountsTable";
import { UserRoundPlus } from "lucide-react";

export default function Employees() {
    const [ open, setOpen ] = useState(false);
    const {data: accounts =[], isLoading, error } = useAccounts(UserRole.EMPLOYEE);
    
    return(
        <div className="flex flex-col gap-4">
            <div className="flex justify-end">
                <Button onClick= {() => setOpen(true)}>
                    <UserRoundPlus />
                    Add Employee
                </Button>
            </div>

            <AccountsTable 
                accounts={accounts}
                loading= {isLoading}
                error= {!!error}
                showAction= {true}
                tableType={UserRole.EMPLOYEE}
                isInDashboard={false}
            />
                
            <AddAccountDialog open= {open} setOpen= {setOpen} role= {UserRole.EMPLOYEE}/>
        </div>
    );
}