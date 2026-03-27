export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import { UserProvider} from "@/components/providers/UserContext"
import { requireRole } from "@/features/auth/server/auth"
import { UserRole } from "@/lib/types/roles";
import { Toaster } from "sonner";

export default async function EmployeeLayout({children}: {children: ReactNode}){
    const user = await requireRole(UserRole.EMPLOYEE);
    
    return(
        <UserProvider initialUser={user}>
            {children}
            <Toaster richColors position= "top-center" />
        </UserProvider>
    );
}