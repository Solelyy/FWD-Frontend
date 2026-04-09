export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import { requireRole } from "@/features/auth/server/auth"
import { UserRole } from "@/lib/types/roles";
import { Toaster } from "sonner";
import { testRequireRole } from "@/features/auth/server/testAuth";

export default async function SuperAdminLayout({children}: {children: ReactNode}){
    console.log("📍Super admin layout.tsx. Checking role...")

    await testRequireRole(UserRole.SUPER_ADMIN);
    
      return (
        <>
            {children}
            <Toaster richColors position= "top-center" />
        </>   
    );
}