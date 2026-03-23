export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import { requireRole } from "@/features/auth/server/auth"
import { UserRole } from "@/lib/types/roles";
import { Toaster } from "sonner";
import { useUser } from "@/components/providers/UserContext";

export default async function SuperAdminLayout({children}: {children: ReactNode}){
    const user = useUser();
    await requireRole(UserRole.SUPER_ADMIN, user);
    
    return(
        <>
        {children}
        <Toaster richColors position= "top-center" />
        </>
    );
}