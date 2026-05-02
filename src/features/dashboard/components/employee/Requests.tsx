import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTableDate, getMonthYear } from "@/lib/util/date-format";
import { formatPeso } from "@/lib/util/currency-format";
import { Calendar, ReceiptText, Wallet } from "lucide-react";

type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";
type RequestKind = "LEAVE" | "CASH_ADVANCE" | "REIMBURSEMENT";

type DashboardRequest = {
    id: string;
    kind: RequestKind;
    submittedAt: string;
    title: string;
    description?: string;
    status: RequestStatus;
    amount?: number;
};

const mockRequests: DashboardRequest[] = [
    {
        id: "req-001",
        kind: "LEAVE",
        submittedAt: "2026-04-22T09:30:00.000Z",
        title: "Vacation Leave",
        description: "Apr 29 - Apr 30",
        status: "PENDING",
    },
    {
        id: "req-002",
        kind: "CASH_ADVANCE",
        submittedAt: "2026-04-18T10:15:00.000Z",
        title: "Cash Advance Request",
        amount: 5000,
        status: "APPROVED",
    },
];

const statusStyles: Record<RequestStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
};

const statusText: Record<RequestStatus, string> = {
    PENDING: "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected",
};

const requestIcon: Record<RequestKind, React.ComponentType<{ className?: string }>> = {
    LEAVE: Calendar,
    CASH_ADVANCE: Wallet,
    REIMBURSEMENT: ReceiptText,
};

export default function Requests() {
    return (
        <div className="flex flex-col flex-1">
            <p className="mb-2 text-sm font-light lg:text-base">My Requests</p>

           <Card className="flex h-full flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center justify-start gap-2 text-base lg:text-lg">
                        <Calendar size={18}/>
                        {getMonthYear(new Date())}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="space-y-3 lg:space-y-4">
                        {mockRequests.map((request) => {
                            const Icon = requestIcon[request.kind];

                            return (
                                <div
                                    key={request.id}
                                    className="rounded-xl border p-4 shadow-sm lg:p-5"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="flex items-center gap-2 text-sm font-medium lg:text-base">
                                                <Icon className="h-5 w-5 text-muted-foreground" />
                                                {request.title}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground lg:text-sm">
                                                {request.description}
                                            </p>
                                        </div>

                                        <span className={`rounded-md px-2.5 py-1 text-xs font-medium lg:text-sm ${statusStyles[request.status]}`}>
                                            {statusText[request.status]}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground lg:text-sm">
                                        <span>Submitted {formatTableDate(request.submittedAt)}</span>
                                        {request.amount !== undefined && (
                                            <span className="font-medium text-foreground">{formatPeso(request.amount)}</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card> 
        </div>
    );
}