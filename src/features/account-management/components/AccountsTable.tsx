import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import type { AccountInfo } from "@/features/account-management/types/account";
import { formatDateTime } from "@/lib/util/date-format";
import { fullName } from "@/lib/util/name-format";
import { Actions } from "./AccountsTableActions";
import { SkeletonTableRows } from "@/components/skeletons/TableRows";
import { useUser } from "@/components/providers/UserContext"
import { UserRole } from "@/lib/types/roles";
import { Status } from "@/features/account-management/types/account";

type AccountsTableProps = {
    accounts: AccountInfo[],
    loading? : boolean
    error?: boolean
    showAction?: boolean
}
export default function AccountsTable({accounts, loading, error, showAction } : AccountsTableProps) {
    const user = useUser();
    const statusStyles: Partial<Record<Status, string>> = {
        [Status.PENDING]: "bg-yellow-100 text-yellow-600",
        [Status.ACTIVE]: "bg-green-100 text-green-600",
        [Status.INACTIVE]: "bg-gray-100 text-gray-600",
        [Status.SUSPENDED]: "bg-red-100 text-red-600",
        [Status.EXPIRED]: "bg-orange-100 text-orange-600",
    }

    return (
        <div className="overflow-x-auto">
        <Table>
            <TableHeader className="bg-[#FFEB94]/40">
                <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Invitation Date</TableHead>
                    {showAction && (
                        <TableHead>Actions</TableHead>
                    )}
                </TableRow>
            </TableHeader>

            <TableBody>
                {loading && (
                <SkeletonTableRows />
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
                    {user.role === UserRole.SUPER_ADMIN 
                    ? (<>No admin accounts yet. Click <span className="font-bold">Add Admin</span> to create one.</> )
                    : (<>No employee accounts yet. Click <span className="font-bold">Add Employee</span> to create one.</>) }
                    </TableCell>
                </TableRow>
                )}

                {!loading && !error && accounts.map((account) => (
                   <TableRow key={account.employeeId} >
                        <TableCell className="font-medium">
                            {account.employeeId}
                        </TableCell>

                        <TableCell>
                            {fullName(account.firstname, account.lastname)}
                        </TableCell>
                        
                        <TableCell className="max-w-30 sm:max-w-40 overflow-auto">
                            {account.email}
                        </TableCell>

                        <TableCell>
                            <span className={`px-2 py-1 text-xs font-medium rounded-md ${statusStyles[account.status]}`}>
                                {account.status}
                            </span>
                        </TableCell>

                        <TableCell>
                            {formatDateTime(account.invitationDate)}
                        </TableCell>
                        
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