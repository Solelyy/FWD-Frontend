import { ReportsSummary } from "../types/reports";
import CardContainerRequests from "@/components/shared/CardContainerRequests";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { CalendarCheck, Calendar1, PhilippinePeso, Wallet } from "lucide-react";

type LeaveCardsProps = {
  data?: ReportsSummary;
};

export default function ReportsCards({ data }: LeaveCardsProps) {
  const normalizedAttendanceRate = (() => {
    const rate = data?.attendanceRate ?? 0;
    return rate <= 1 ? rate * 100 : rate;
  })();

  const cards = [
    {
      title: "Attendance Rate",
      value: Math.round(normalizedAttendanceRate),
      desc: "Attendance rate for the month",
      suffix: "%",
      icon: <CalendarCheck />,
    },
    {
      title: "Leave Used",
      value: data?.leaveUsed,
      desc: "Leave used within the month",
      icon: <Calendar1 />,
    },
    {
      title: "Cash Advanced",
      value: data?.totalCashAdvance,
      desc: "Total advances for the month",
      showDec: true,
      icon: <PhilippinePeso />,
    },
    {
      title: "Total Reimbursed",
      value: data?.totalReimbursed,
      desc: "Total reimbursement for the month",
      showDec: true,
      icon: <Wallet />,
    },
  ];

  return (
    <CardContainerRequests title="Report's Summary" gridClassName="grid-cols-2 gap-3 md:grid-cols-4">
      {cards.map((c) => (
        <CardLayoutV2
          key={c.title}
          title={c.title}
          dataCount={c.value ?? 0}
          description={c.desc}
          showDecimal={c.showDec}
          valueSuffix={c.suffix}
          icon={c.icon}
          iconTone="blue"
        />
      ))}
    </CardContainerRequests>
  );
}
