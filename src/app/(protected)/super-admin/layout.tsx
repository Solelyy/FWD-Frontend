export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import { requireRole } from "@/features/auth/server/auth"
import { UserRole } from "@/lib/types/roles";
import { Toaster } from "sonner";

export default async function SuperAdminLayout({children}: {children: ReactNode}){
    await requireRole(UserRole.SUPER_ADMIN);
    
    return(
        <>
        {children}
        <Toaster richColors position= "top-center" />
        </>
    );
}