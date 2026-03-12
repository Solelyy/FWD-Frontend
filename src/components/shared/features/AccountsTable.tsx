import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/shared/ui/table";
import type { AccountInfo } from "@/lib/types/account";
import { formatDateTime } from "@/lib/util/date-format";
import { fullName } from "@/lib/util/name-format";
import { Actions } from "./Actions";

const admins: AccountInfo[]= [
    {
    employeeId: "ADMIN01",
    firstname: "Jessa",
    lastname: "Gozun",
    email: "jessagozun@gmail.com",
    status: "ACTIVE",
    invitationDate: "2026-03-01T23:00:00Z",
    }, 
    {
    employeeId: "ADMIN02",
    firstname: "Paul",
    lastname: "Celeste",
    email: "paul@gmail.com",
    status: "PENDING",
    invitationDate: "2026-03-01T23:00:00Z",
    },
    {
    employeeId: "ADMIN03",
    firstname: "Taylor",
    lastname: "Swift",
    email: "swifttay@gmail.com",
    status: "SUSPENDED",
    invitationDate: "2026-03-01T23:00:00Z",
    }, 
    {
    employeeId: "ADMIN04",
    firstname: "Ariana",
    lastname: "Grande",
    email: "taytay@gmail.com",
    status: "EXPIRED",
    invitationDate: "2026-03-01T24:00:00Z",
    },
    {
    employeeId: "ADMIN05",
    firstname: "Kween",
    lastname: "Leng",
    email: "kween@gmail.com",
    status: "INACTIVE",
    invitationDate: "2026-03-02T23:00:00Z",
    }
];

export default function AccountsTable() {
    const statusStyles = {
        PENDING: "bg-yellow-100 text-yellow-600",
        ACTIVE: "bg-green-100 text-green-600",
        INACTIVE: "bg-gray-100 text-gray-600",
        SUSPENDED: "bg-red-100 text-red-600",
        EXPIRED: "bg-orange-100 text-orange-600"
    }
    return (
        <Table>
            <TableHeader className="bg-[#FFEB94]/40">
                <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Invitation Date</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {admins.map((admin) => (
                   <TableRow key={admin.employeeId} >
                    <TableCell className="font-medium">{admin.employeeId}</TableCell>
                    <TableCell>{fullName(admin.firstname, admin.lastname)}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                        <span className={`px-2 py-1 text-xs font-medium rounded-md ${statusStyles[admin.status]}`}>
                            {admin.status}
                        </span>
                    </TableCell>
                    <TableCell>{formatDateTime(admin.invitationDate)}</TableCell>
                    <TableCell>
                        <Actions admin={admin}/>
                    </TableCell>
                </TableRow> 
                ))}
            </TableBody>
        </Table>
    );
}