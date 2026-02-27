import { ReactNode } from "react";
import { requireAuth } from "@/lib/server/auth";
import { UserProvider } from "@/context/UserContext";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireAuth();
  return (
    <UserProvider user={user}>
      <div className="min-h-screen flex flex-col items-center justify-start">
        {children}
    </div>
    </UserProvider>
    );
}