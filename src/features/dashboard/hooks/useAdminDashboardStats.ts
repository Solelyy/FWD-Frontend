import { useAccounts } from "@/features/account-management/hooks/useAccount";
import { useAttendanceStats } from "@/app/(protected)/admin/attendance/hooks/useAttendanceStats";
import { UserRole } from "@/lib/types/roles";

export function useAdminDashboardStats() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const { data: employees = [], isLoading: loadingEmployees } = useAccounts(UserRole.EMPLOYEE);
    const { data: attendanceStats, isLoading: loadingAttendanceStats } = useAttendanceStats(day, month, year);
    const totalEmployees = employees.length;

    const presentToday = attendanceStats?.presentToday ?? 0;
    const onLeave = 0;
    const cashAdvance = 0;
    const reimbursement = 0;

    return {
        employees,
        totalEmployees,
        isLoading: loadingEmployees || loadingAttendanceStats,
        presentToday,
        onLeave,
        cashAdvance,
        reimbursement
    };
}