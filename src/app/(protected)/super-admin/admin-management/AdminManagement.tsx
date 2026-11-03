"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddAccountDialog } from "@/features/account-management/components/AddAccountDialog";
import AccountsTable from "@/features/account-management/components/AccountsTable";
import { UserRole } from "@/lib/types/roles";
import { useAccounts } from "@/features/account-management/hooks/useAccount";
import { ShieldPlus, UserRoundPlus } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminManagement() {
  const [open, setOpen] = useState(false);
  const { data: accounts = [], isLoading, error } = useAccounts(UserRole.ADMIN); // rename data property as accounts with an empty array

  return (
    <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
      <Card className="gap-0 overflow-hidden">
        <CardHeader className="grid grid-cols-[auto_minmax(0,1fr)_auto] grid-rows-[auto_auto] items-center gap-x-3 gap-y-1 px-6 py-4">
          <span className="col-start-1 row-span-2 row-start-1 inline-flex rounded-md border border-primary/20 bg-primary/10 p-2 text-primary">
            <ShieldPlus className="h-5 w-5" />
          </span>
          <CardTitle className="col-start-2 row-start-1 min-w-0 text-base">Admin accounts</CardTitle>
          <CardDescription className="col-start-2 row-start-2 min-w-0 truncate">Create and manage administrator access.</CardDescription>
          <Button className="col-start-3 row-span-2 row-start-1" onClick={() => setOpen(true)}>
            <UserRoundPlus />
            Add Admin
          </Button>
        </CardHeader>
      </Card>

      <AccountsTable
        accounts={accounts}
        loading={isLoading}
        error={!!error} // !! is a boolean conversion, ex: convert null to false
        // since we expect boolean value in our AccountsTableProps that is why we need to convert it in boolean.
        showAction={true}
        tableType={UserRole.ADMIN}
        isInDashboard={false}
      />

      <AddAccountDialog open={open} setOpen={setOpen} role={UserRole.ADMIN} />
    </div>
  );
}
