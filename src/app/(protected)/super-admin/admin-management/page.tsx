"use client"

import { ContentLayout } from "@/components/shared/layout/panel/content-layout";
import { Button } from "@/components/shared/ui/button";
import { useState } from "react";
import { AddAdminDialog } from "@/components/super-admin/AddAdminDialog";

export default function AdminManagement() {
    const [ open, setOpen ] = useState(false);
    
    return(
    <ContentLayout title="Admin Management">
        <div className="flex justify-end">
            <Button onClick= {() => setOpen(true)}>Add Admin</Button>
        </div>

        <AddAdminDialog open= {open} setOpen= {setOpen}/>
    </ContentLayout>
    );
}