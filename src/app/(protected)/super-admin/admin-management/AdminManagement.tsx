"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddAccountDialog } from "@/features/account-management/components/AddAccountDialog";
import AccountsTable from "@/features/account-management/components/AccountsTable";
import { UserRole } from "@/lib/types/roles";
import { useAccounts } from "@/features/account-management/hooks/useAccount";
import { UserRoundPlus } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AdminManagement() {
    const [ open, setOpen ] = useState(false);
    const { data: accounts = [], isLoading, error } = useAccounts(UserRole.ADMIN); // rename data property as accounts with an empty array
    
    return(
        <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
            <Card className="gap-0 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 px-6">
                        <div className="min-w-0 flex-1">
                            <p className="text-base font-semibold text-foreground">Need to add a new admin account?</p>
                            <p className="text-sm text-muted-foreground">Use the Add Admin button to create an account and include them in this list.</p>
                        </div>

                        <Button className="shrink-0" onClick= {() => setOpen(true)}>
                            <UserRoundPlus />
                            Add Admin
                        </Button>
                    </div>
                </Card>

            <AccountsTable 
                accounts={accounts}
                loading= {isLoading}
                error= {!!error} // !! is a boolean conversion, ex: convert null to false 
                // since we expect boolean value in our AccountsTableProps that is why we need to convert it in boolean.
                showAction= {true} 
                tableType={UserRole.ADMIN}
                isInDashboard={false}
            />
                
            <AddAccountDialog open={open} setOpen={setOpen} role={UserRole.ADMIN}/>
        </div>
    );
}