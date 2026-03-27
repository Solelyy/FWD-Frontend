import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import type { AccountInfo } from "@/features/account-management/types/account";
import { formatDateTime } from "@/lib/util/date-format";
import { fullName } from "@/lib/util/name-format";
import { Actions } from "./AccountsTableActions";
import { SkeletonTableRows } from "@/components/skeletons/TableRows";
import { useUser } from "@/components/providers/UserContext"
import { UserRole } from "@/lib/types/roles";
import { Status } from "@/features/account-management/types/account";
import { AccountsTableProps } from "../types/table";

export default function AccountsTable({accounts, loading, error, showAction, tableType, visibleColumns} : AccountsTableProps) {
    const {user} = useUser();
    const statusStyles: Record<Status, string> = {
        [Status.PENDING]: "bg-yellow-100 text-yellow-600",
        [Status.ACTIVE]: "bg-green-100 text-green-600",
        [Status.INACTIVE]: "bg-gray-100 text-gray-600",
        [Status.SUSPENDED]: "bg-red-100 text-red-600",
        [Status.EXPIRED]: "bg-orange-100 text-orange-600",
        [Status.REMOVED]: "bg-red-100 text-red-600"
    }

    //for columns visibility use in dashboards
    const columns = visibleColumns && visibleColumns.length > 0
    ? visibleColumns
    : ["id","name","email","status","invitationDate"];

    return (
        <div className="overflow-x-auto">
        <Table>
            <TableHeader className="bg-[#FFEB94]/40">
                <TableRow>
                    {columns.includes("id") && <TableHead>Employee ID</TableHead>}
                    {columns.includes("name") && <TableHead>Name</TableHead>}
                    {columns.includes("email") && <TableHead>Email</TableHead>}
                    {columns.includes("status") && <TableHead>Status</TableHead>}
                    {columns.includes("invitationDate") && <TableHead>Invitation Date</TableHead>}
                    {showAction && <TableHead>Actions</TableHead>}
                </TableRow>
            </TableHeader>

            <TableBody>
                {loading && (
                <SkeletonTableRows showAction={showAction}/>
                )}

                {error && (
                <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-red-400">
                        Failed to load accounts.
                    </TableCell>
                </TableRow>
                )}

                {!loading && !error && accounts.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                    {tableType === UserRole.ADMIN ? (
                        <>No admin accounts yet. Click <span className="font-bold">Add Admin</span> to create one.</> )
                    : (
                        <>
                        No employee accounts yet.{user?.role == UserRole.ADMIN && (
                            <>
                            {" "} Click {" "}
                            <span className="font-bold">Add Employee</span> to create one.
                            </>
                        )} 
                        </>
                    )}
                    </TableCell>
                </TableRow>
                )}

                {!loading && !error && accounts.map((account) => (
                   <TableRow key={account.employeeId} >
                        {columns.includes("id") && 
                            <TableCell className="font-medium"> 
                                {account.employeeId} 
                            </TableCell>
                        }

                        {columns.includes("name") && 
                            <TableCell> 
                                {fullName(account.firstname, account.lastname)} 
                                </TableCell>}

                        {columns.includes("email") && 
                            <TableCell className="max-w-30 sm:max-w-40 overflow-auto">
                                {account.email}
                            </TableCell>
                        }
                        
                        {columns.includes("status") && 
                            <TableCell>
                                <span className={`px-2 py-1 text-xs font-medium rounded-md ${statusStyles[account.status]}`}>
                                    {account.status}
                                </span>
                            </TableCell>
                        }
                        
                        {columns.includes("invitationDate") && 
                            <TableCell>
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
    );
}