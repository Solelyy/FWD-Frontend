"use client";

import { useState } from "react";
import { AddAccountDialog } from "@/features/account-management/components/AddAccountDialog";
import AccountsTable from "@/features/account-management/components/AccountsTable";
import { UserRole } from "@/lib/types/roles";
import { useAccounts } from "@/features/account-management/hooks/useAccount";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserRoundPlus, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmployeeList() {
  const [open, setOpen] = useState(false);
  const {
    data: accounts = [],
    isLoading,
    error,
  } = useAccounts(UserRole.EMPLOYEE);

  return (
    <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
      <Card className="gap-0 overflow-hidden">
        <CardHeader className="grid grid-cols-[auto_minmax(0,1fr)_auto] grid-rows-[auto_auto] items-center gap-x-3 gap-y-1 px-6 py-4">
          <span className="col-start-1 row-span-2 row-start-1 inline-flex rounded-md border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
            <UsersRound className="h-5 w-5" />
          </span>
          <CardTitle className="col-start-2 row-start-1 min-w-0 text-base">Employee accounts</CardTitle>
          <CardDescription className="col-start-2 row-start-2 min-w-0 truncate">Create and manage employee access.</CardDescription>
          <Button className="col-start-3 row-span-2 row-start-1" onClick={() => setOpen(true)}>
            <UserRoundPlus />
            Add Employee
          </Button>
        </CardHeader>
      </Card>

      <AccountsTable
        accounts={accounts}
        loading={isLoading}
        error={!!error}
        showAction={true}
        tableType={UserRole.EMPLOYEE}
        isInDashboard={false}
        alignActions={true}
        alignInvitationDate={true}
        centerInvitationDate={true}
      />

      <AddAccountDialog
        open={open}
        setOpen={setOpen}
        role={UserRole.EMPLOYEE}
      />
    </div>
  );
}
