"use client";

import CardContainerRequests from "@/components/shared/CardContainerRequests";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { useAttendanceSummary } from "@/app/(protected)/employee/attendance/get-attendance/hooks/useAttendanceSummary";
import { useLeaveBalances } from "@/app/(protected)/employee/leave/hooks/useLeaveBalances";
import { useCashAdvanceSummary } from "@/app/(protected)/employee/cash-advance/hooks/useCashAdvanceSummary";
import { useReimbursementSummary } from "@/app/(protected)/employee/reimbursement/hooks/useReimbursementSummary";
import { CalendarCheck, CalendarDays, PhilippinePeso, Wallet } from "lucide-react";

export default function EmployeeCards() {
    const today = new Date();
    const attendanceQuery = useAttendanceSummary(today.getMonth(), today.getFullYear());
    const leaveQuery = useLeaveBalances();
    const cashAdvanceQuery = useCashAdvanceSummary();
    const reimbursementQuery = useReimbursementSummary();
    const isLoading = attendanceQuery.isLoading
        || leaveQuery.isLoading
        || cashAdvanceQuery.isLoading
        || reimbursementQuery.isLoading;
    const attendance = attendanceQuery.data;
    const leave = leaveQuery.data;
    const cashAdvance = cashAdvanceQuery.data;
    const reimbursement = reimbursementQuery.data;

    const cards = [
        {
            title: "Present Days",
            value: attendance?.presentDays,
            icon: <CalendarCheck />,
            description: "This month",
        },
        {
            title: "Leave Balance",
            value: leave
                ? leave.sickLeaveBalance + leave.vacationLeaveBalance + leave.accumulatedLeave
                : undefined,
            icon: <CalendarDays />,
            description: "Available days",
        },
        {
            title: "Total Reimbursed",
            value: reimbursement?.totalApproved,
            icon: <Wallet />,
            description: "Approved amount",
            showDecimal: true,
        },
        {
            title: "Total Cash Advanced",
            value: cashAdvance?.totalAdvanced,
            icon: <PhilippinePeso />,
            description: "Advanced amount",
            showDecimal: true,
        },
    ];

    return (
        <CardContainerRequests
            title="My Summary"
            gridClassName="grid-cols-2 gap-3 md:grid-cols-4"
        >
            {cards.map((card) => (
                <CardLayoutV2
                    key={card.title}
                    title={card.title}
                    dataCount={card.value ?? 0}
                    description={card.description}
                    icon={card.icon}
                    iconTone="blue"
                    showDecimal={card.showDecimal}
                    isLoading={isLoading}
                />
            ))}
        </CardContainerRequests>
    );
}
