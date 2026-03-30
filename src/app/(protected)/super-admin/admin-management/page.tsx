"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddAccountDialog } from "@/features/account-management/components/AddAccountDialog";
import AccountsTable from "@/features/account-management/components/AccountsTable";
import { UserRole } from "@/lib/types/roles";
import { useAccounts } from "@/features/account-management/hooks/useAccount";
import { UserRoundPlus } from "lucide-react";

export default function AdminManagement() {
    const [ open, setOpen ] = useState(false);
    const { data: accounts = [], isLoading, error } = useAccounts(UserRole.ADMIN); // rename data property as accounts with an empty array
    
    return(
        <ContentLayout title="Admin Management">
            <div className="flex flex-col gap-4">
                <div className="flex justify-end">
                    
                    <Button onClick= {() => setOpen(true)}>
                        <UserRoundPlus />
                        Add Admin
                    </Button>
                </div>

                <AccountsTable 
                    accounts={accounts}
                    loading= {isLoading}
                    error= {!!error} // !! is a boolean conversion, ex: convert null to false 
                    // since we expect boolean value in our AccountsTableProps that is why we need to convert it in boolean.
                    showAction= {true} 
                    tableType={UserRole.ADMIN}
                    isInDashboard={false}
                />
                
                <AddAccountDialog open= {open} setOpen= {setOpen} role= {UserRole.ADMIN}/>
            </div>
        </ContentLayout>
    );
}