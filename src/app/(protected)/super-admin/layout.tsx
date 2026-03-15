export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import { UserProvider} from "@/components/providers/UserContext"
import { requireRole } from "@/features/auth/server/auth"
import { UserRole } from "@/lib/types/roles";
import { Toaster } from "sonner";

export default async function SuperAdminLayout({children}: {children: ReactNode}){
    const user = await requireRole(UserRole.SUPER_ADMIN);
    
    return(
        <UserProvider user={user}>
            {children}
            <Toaster richColors position= "top-center" />
        </UserProvider>
    );
}