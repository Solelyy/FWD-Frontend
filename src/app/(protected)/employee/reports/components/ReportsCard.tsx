import { ReportsSummary } from "../types/reports";
import CardContainer from "@/components/shared/CardContainer";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";

type LeaveCardsProps = {
    data?: ReportsSummary;
}

export default function ReportsCards({ data }: LeaveCardsProps) {
    const normalizedAttendanceRate = (() => {
        const rate = data?.attendanceRate ?? 0;
        return rate <= 1 ? rate * 100 : rate;
    })();

    const cards = [
        {title: "Attendance Rate", value: Math.round(normalizedAttendanceRate), desc: "Attendance rate for the month", suffix: "%"},
        {title: "Leave Used", value: data?.leaveUsed, desc: "Leave used within the month"},
        {title: "Cash Advanced", value: data?.totalCashAdvance, desc: "Total advances for the month", showDec: true},
        {title: "Total Reimbursed", value: data?.totalReimbursed, desc: "Total reimbursement for the month", showDec: true},

    ]

    return (
        <CardContainer title="Report's Summary">
            {cards.map((c) => 
                <CardLayoutV2 key={c.title} title={c.title} dataCount={c.value ?? 0} description={c.desc} showDecimal={c.showDec} valueSuffix={c.suffix}/>
            )}
        </CardContainer>
    );
}
