import { useAccounts } from "@/features/account-management/hooks/useAccount";
import { Status } from "@/features/account-management/types/account";
import { UserRole } from "@/lib/types/roles";

export function useSuperAdminDashboardStats() {
    const { data: admins = [], isLoading: loadingAdmins } = useAccounts(UserRole.ADMIN);
    const { data: employees = [], isLoading: loadingEmployees } = useAccounts(UserRole.EMPLOYEE);

    const totalAdmins = admins.length;
    const totalEmployees = employees.length;

    const activeAccounts = [...admins, ...employees].filter(
        (acc) => acc.status === Status.ACTIVE
    ).length;

    return {
        admins,
        employees,
        totalAdmins, 
        totalEmployees,
        activeAccounts,
        isLoading: loadingAdmins || loadingEmployees,
    };
}