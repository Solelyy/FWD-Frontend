import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

export default function CashAdvance() {
    return (
        <div className="space-y-6">
            {/* Cash Advance Requests Section */}
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

            {/* Cash Advance Summary Section */}
            <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Cash Advance Summary</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Total Available */}
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-600">Total Available</p>
                        <p className="text-2xl font-bold">₱50,000.00</p>
                        <p className="text-xs text-gray-500 mt-1">maximum amount</p>
                    </div>

                    {/* Total Advanced */}
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-600">Total Advanced</p>
                        <p className="text-2xl font-bold">₱0.00</p>
                        <p className="text-xs text-gray-500 mt-1">currently utilized</p>
                    </div>

                    {/* Remaining Balance */}
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-600">Remaining Balance</p>
                        <p className="text-2xl font-bold">₱50,000.00</p>
                        <p className="text-xs text-gray-500 mt-1">available to request</p>
                    </div>
                </div>
            </Card>
        </div>
    );
}