import { useAccounts } from "@/features/account-management/hooks/useAccount";
import { UserRole } from "@/lib/types/roles";

export function useAdminDashboardStats() {
    const { data: employees = [], isLoading: loadingEmployees } = useAccounts(UserRole.EMPLOYEE);
    const totalEmployees = employees.length;

    const presentToday = 0;
    const onLeave = 0;
    const cashAdvance = 0;
    const reimbursement = 0;

    return {
        employees,
        totalEmployees,
        isLoading: loadingEmployees,
        presentToday,
        onLeave,
        cashAdvance,
        reimbursement
    };
}