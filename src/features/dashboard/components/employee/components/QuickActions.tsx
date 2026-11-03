import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, PhilippinePeso, Wallet } from "lucide-react";
import Link from "next/link";

type Props = {
    openReimbursment: boolean;
    onOpenReimbursementChange: (openReimbursement: boolean) => void;
    openCashAdvance: boolean;
    onOpenCashAdvanceChange: (openCashAdvance: boolean) => void;
    openLeave: boolean;
    onOpenLeaveChange: (openLeave: boolean) => void;
}

export default function QuickActions({ onOpenReimbursementChange, onOpenCashAdvanceChange, onOpenLeaveChange }: Props) {
    const actionButtonClass = "h-full min-h-20 w-full flex-col justify-center gap-3 rounded-lg border-border/70 bg-background px-3 py-4 text-center text-sm font-medium shadow-xs transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground focus-visible:border-primary focus-visible:ring-primary/30 lg:min-h-24 lg:px-5 lg:text-base";
    const iconClass = "flex size-9 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15";

    return (
        <Card className="overflow-hidden border-border/70 shadow-xs">
            <CardHeader className="border-b">
                <CardTitle className="text-base lg:text-lg">Quick Actions</CardTitle>
                <p className="text-sm text-muted-foreground">Common actions for your employee records.</p>
            </CardHeader>
            <CardContent className="pt-5">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4">
                    <Link href="/employee/attendance" className="h-full">
                        <Button className={`${actionButtonClass} group`} variant="outline">
                            <span className={iconClass}>
                                <Clock className="size-5" />
                            </span>
                            View Attendance Logs
                        </Button>
                    </Link>

                    <Button
                        className={`${actionButtonClass} group`}
                        variant="outline"
                        onClick={() => onOpenReimbursementChange(true)}
                    >
                        <span className={iconClass}>
                            <Wallet className="size-5" />
                        </span>
                        Submit Reimbursement
                    </Button>

                    <Button
                        className={`${actionButtonClass} group`}
                        variant="outline"
                        onClick={() => onOpenCashAdvanceChange(true)}
                    >
                        <span className={iconClass}>
                            <PhilippinePeso className="size-5" />
                        </span>
                        Request Cash Advance
                    </Button>

                    <Button
                        className={`${actionButtonClass} group`}
                        variant="outline"
                        onClick={() => onOpenLeaveChange(true)}
                    >
                        <span className={iconClass}>
                            <Calendar className="size-5" />
                        </span>
                        File Leave
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
