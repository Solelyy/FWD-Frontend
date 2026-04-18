import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRoundPen } from "lucide-react";

export default function LeaveBalances() {
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
    </Card>
    );
}