import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { formatDateTime } from "@/lib/util/date-format";
import { fullName } from "@/lib/util/name-format";
import { Actions } from "./AccountsTableActions";
import { SkeletonTableRows } from "@/components/skeletons/TableRows";
import { useUser } from "@/components/providers/UserContext"
import { UserRole } from "@/lib/types/roles";
import { Status } from "@/features/account-management/types/account";
import { AccountsTableProps } from "../types/table";
import { Card } from "@/components/ui/card";
import SearchBar from "@/components/shared/SearchBar";
import { useState } from "react";
import { useFilteredAccounts } from "../hooks/useFilteredAccounts";
import AvatarInitials from "@/lib/components/AvatarInitials";

export default function AccountsTable({accounts, loading, error, showAction, tableType, visibleColumns, isInDashboard} : AccountsTableProps) {
    const {user} = useUser();
    const statusStyles: Record<Status, string> = {
        [Status.PENDING]: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300",
        [Status.ACTIVE]: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300",
        [Status.INACTIVE]: "border-border bg-muted text-muted-foreground",
        [Status.SUSPENDED]: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300",
        [Status.EXPIRED]: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-300",
        [Status.REMOVED]: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
    }

    //for columns visibility use in dashboards
    const columns = visibleColumns && visibleColumns.length > 0
    ? visibleColumns
    : ["name","email","status","invitationDate"]; //removed id 

    //this is for search bar
    const [searchTerm, setSearchTerm] = useState("");
    const filteredAccounts = useFilteredAccounts(accounts, searchTerm);

    return (
        <Card className={`${!isInDashboard ? "min-h-[28rem]" : ""} gap-5 p-4 md:p-5`}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium">Account directory</p>
                    <p className="text-xs text-muted-foreground">
                        {filteredAccounts.length} {filteredAccounts.length === 1 ? "account" : "accounts"} shown
                    </p>
                </div>
                <SearchBar value={searchTerm} onChange ={setSearchTerm}/>
            </div>

            <div className="flex-1 overflow-x-auto rounded-lg border border-border/70 bg-card">
                <Table>
                    <TableHeader className="bg-muted/60">
                        <TableRow>
                            {/*{columns.includes("id") && <TableHead>Employee ID</TableHead>} */}
                            {columns.includes("name") && <TableHead className="pl-4">Name</TableHead>}
                            {columns.includes("email") && <TableHead>Email</TableHead>}
                            {columns.includes("status") && <TableHead>Status</TableHead>}
                            {columns.includes("invitationDate") && <TableHead>Invitation Date</TableHead>}
                            {showAction && <TableHead className="pr-4 text-right">Actions</TableHead>}
                        </TableRow>
                    </TableHeader>

                    <TableBody className="bg-card">
                        {loading && (
                        <SkeletonTableRows  columns={columns} showAction={showAction} />
                        )}

                        {error && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-red-400">
                                Failed to load accounts.
                            </TableCell>
                        </TableRow>
                        )}

                        {!loading && !error && filteredAccounts.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                            {searchTerm ? ( 
                                <>No results found</>
                            ) : tableType === UserRole.ADMIN ? (
                                <>
                                No admin accounts yet. 
                                {!isInDashboard && (
                                    <>
                                        {" "} Click <span className="font-bold">Add Admin</span> to create one.
                                    </>
                                )}
                                </> ) : (
                                    <>
                                    No employee accounts yet.
                                    {user?.role == UserRole.ADMIN && !isInDashboard && (
                                        <>
                                        {" "} Click {" "} <span className="font-bold">Add Employee</span> to create one.
                                        </>
                                    )} 
                                </>
                            )}
                            </TableCell>
                        </TableRow>
                        )}

                        {!loading && !error && filteredAccounts.map((account) => (
                        <TableRow key={account.employeeId} className="group">
                                {/* 
                                {columns.includes("id") && 
                                    <TableCell className="font-medium"> 
                                        {account.employeeId} 
                                    </TableCell>
                                }*/}

                                {columns.includes("name") && 
                                    <TableCell className="pl-4">
                                        <div className="flex items-center gap-3">
                                            <AvatarInitials firstname={account.firstname} lastname={account.lastname}/>
                                            <span className="font-medium text-foreground">{fullName(account.firstname, account.lastname)}</span>
                                        </div>
                                    </TableCell>}

                                {columns.includes("email") && 
                                    <TableCell className="max-w-30 overflow-hidden text-ellipsis text-muted-foreground sm:max-w-40">
                                        <span className="block overflow-hidden text-ellipsis">{account.email}</span>
                                    </TableCell>
                                }
                                
                                {columns.includes("status") && 
                                    <TableCell>
                                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[account.status]}`}>
                                            {account.status}
                                        </span>
                                    </TableCell>
                                }
                                
                                {columns.includes("invitationDate") && 
                                    <TableCell className="pr-4 text-right">
                                        {formatDateTime(account.invitationDate)}
                                    </TableCell>
                                }
                                
                                {showAction && (
                                    <TableCell>
                                        <Actions account={account}/>
                                    </TableCell>
                                )}
                            </TableRow> 
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}