"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRoundPen } from "lucide-react";
import { useEmployeesLeaveBalances } from "../hooks/useEmployeesLeaveBalances";
import LeaveBalancesTable from "./LeaveBalancesTable";

export default function LeaveBalances() {
    const leaves = [
        {label: "Sick", count: 6},
        {label: "Vacation", count: 6},
    ];

    const {data, isLoading, error} = useEmployeesLeaveBalances();

    return (
    <Card>
        <CardHeader>
            <CardTitle>Leave Balances</CardTitle>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <CardDescription> 
                    This shows employees’ leave balances
                </CardDescription>

                <Button>
                    <UserRoundPen />
                    Generate New Year Balances
                </Button>
            </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
                {leaves.map((l) => (
                    <div
                        key={l.label}
                        className="rounded-full border bg-muted/30 px-3 py-1 text-md"
                    >
                        <span className="font-bold text-foreground">{`${l.label} Leave`}</span>: {l.count} days max
                    </div>
                ))}
            </div>

            <LeaveBalancesTable data={data} isLoading={isLoading} error={error} />
        </CardContent>
    </Card>
    );
}