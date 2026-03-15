export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import { requireAuth } from "@/features/auth/server/auth";
import { UserProvider } from "@/components/providers/UserContext";
import AdminPanelLayout from "@/components/layout/panel/admin-panel-layout";
import type { Metadata } from "next";
import QueryProvider from "@/components/providers/QueryProvider";

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
    <QueryProvider>
      <UserProvider user={user}>
        <AdminPanelLayout>
          {children}
        </AdminPanelLayout>
      </UserProvider>
    </QueryProvider>
  );
}