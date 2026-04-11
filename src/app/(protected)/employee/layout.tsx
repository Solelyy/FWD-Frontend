export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import { requireRole } from "@/features/auth/server/auth"
import { UserRole } from "@/lib/types/roles";
import { Toaster } from "sonner";
import { testRequireRole } from "@/features/auth/server/testAuth";

export default async function EmployeeLayout({children}: {children: ReactNode}){
    console.log("📍Employee layout.tsx. Checking role...")
    await requireRole(UserRole.EMPLOYEE);
    
      return (
        <>
            {children}
            <Toaster richColors position= "top-center" />
        </>   
    );
}