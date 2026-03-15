"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddAccountDialog } from "@/features/account-management/components/AddAccountDialog";
import { UserRole } from "@/lib/types/roles";

export default function AdminEmployee() {
    const [ open, setOpen ] = useState(false);
    
    return(
    <ContentLayout title="Employee Management">
        <div className="flex justify-end">
            <Button onClick= {() => setOpen(true)}>Add Employee</Button>
        </div>

        <AddAccountDialog open= {open} setOpen= {setOpen} role={UserRole.EMPLOYEE}/>
    </ContentLayout>
    );
}