import { ReactNode } from "react";
import { requireAuth } from "@/lib/server/auth";
import { UserProvider } from "@/context/UserContext";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  icons: {
    icon: '/assets/icons/favicon.ico',
    apple: '/assets/icons/apple-icon.png',
    shortcut: '/assets/icons/icon.svg'
  }
};

export default async function SuperAdminLayout({ children }: { children: ReactNode }) {
  const user = await requireAuth();

  return (
    <UserProvider user={user}>
      <AdminPanelLayout>
        {children}
      </AdminPanelLayout>
    </UserProvider>
    );
}