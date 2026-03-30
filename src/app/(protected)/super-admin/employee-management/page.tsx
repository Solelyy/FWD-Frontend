"use client";

import { ContentLayout } from "@/components/layout/panel/content-layout";
import { useState } from "react";
import { AddAccountDialog } from "@/features/account-management/components/AddAccountDialog";
import AccountsTable from "@/features/account-management/components/AccountsTable";
import { UserRole } from "@/lib/types/roles";
import { useAccounts } from "@/features/account-management/hooks/useAccount";

export default function EmployeeList() {
  const [open, setOpen] = useState(false);
  const {
    data: accounts = [],
    isLoading,
    error,
  } = useAccounts(UserRole.EMPLOYEE);

  return (
    <ContentLayout title="Employees">
      <AccountsTable 
      accounts={accounts} 
      loading={isLoading} error={!!error} 
      showAction={false}
      tableType={UserRole.EMPLOYEE}
      isInDashboard={false}
      />

      <AddAccountDialog
        open={open}
        setOpen={setOpen}
        role={UserRole.EMPLOYEE}
      />
    </ContentLayout>
  );
}
