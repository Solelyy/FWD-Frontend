"use client"

import { ContentLayout } from "@/components/shared/layout/panel/content-layout";
import { Button } from "@/components/shared/ui/button";
import { useState } from "react";
import { AddAdminDialog } from "@/components/super-admin/AddAdminDialog";
import AccountsTable from "@/components/shared/features/AccountsTable";

export default function AdminManagement() {
    const [ open, setOpen ] = useState(false);
    
    return(
    <ContentLayout title="Admin Management">
        <div className="flex flex-col gap-8">
            <div className="flex justify-end">
                <Button onClick= {() => setOpen(true)}>Add Admin</Button>
            </div>

            <AccountsTable />
            <AddAdminDialog open= {open} setOpen= {setOpen}/>
        </div>
        
    </ContentLayout>
    );
}