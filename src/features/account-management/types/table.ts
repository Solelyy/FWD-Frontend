import { AccountInfo } from "./account";
import { UserRole } from "@/lib/types/roles";

export type AccountsTableProps = {
    accounts: AccountInfo[],
    loading? : boolean
    error?: boolean
    showAction?: boolean
    tableType: UserRole.ADMIN | UserRole.EMPLOYEE,
    visibleColumns?: ("id"|"name"|"email"|"status"|"invitationDate")[],
    isInDashboard: boolean
}