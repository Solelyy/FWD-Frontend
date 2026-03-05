import { ReactNode } from "react";
import { UserProvider} from "@/components/shared/providers/UserContext"
import { requireRole } from "@/lib/server/auth"
import { UserRole } from "@/lib/util/roles";

export default async function SuperAdminLayout({children}: {children: ReactNode}){
    const user = await requireRole(UserRole.SUPER_ADMIN);
    
    return(
        <UserProvider user={user}>
            {children}
        </UserProvider>
    );
}