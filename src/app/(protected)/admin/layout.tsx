import { ReactNode } from "react";
import { UserProvider} from "@/components/shared/providers/UserContext"
import { UserRole } from "@/lib/types/roles";
import { requireRole } from "@/lib/server/auth";

export default async function AdminLayout({children}: {children: ReactNode}){
   const user = await requireRole(UserRole.ADMIN);

    return(
        <UserProvider user={user}>
            {children}
        </UserProvider>
    );
}