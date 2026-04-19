"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useCashAdvanceSummary } from "../hooks/useCashAdvanceSummary";
import CashAdvanceCard from "./CashAdvanceCard";

export default function CashAdvance() {
    const {data: summary, isLoading, error} = useCashAdvanceSummary();

    return (
        <div className="space-y-6">
            {/* Cash Advance Requests Section */}
            <CashAdvanceCard data={summary}/>
            <Card className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Cash Advance Requests</h2>
                    <Button>
                        <Plus/>
                        Request Cash Advance
                    </Button>
                </div>
                
                <div className="overflow-x-auto border rounded-md">
                    <Table>
                        <TableHeader className="bg-[#FFEB94]/40">
                            <TableRow>
                                <TableHead>Date Submitted</TableHead>
                                <TableHead>Amount Requested</TableHead>
                                <TableHead>Amount Approved</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableHead colSpan={4} className="text-center text-sm text-gray-500 py-8">
                                    No cash advance requests yet
                                </TableHead>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </Card>

            
        </div>
    );
}