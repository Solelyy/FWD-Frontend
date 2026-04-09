import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

export default function Reimbursement() {
    return (
        <div className="space-y-6">
            {/* Reimbursement Requests Section */}
            <Card className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Reimbursement Requests</h2>
                    <Button>
                        <Plus/>
                        Request Reimbursement
                    </Button>
                </div>
                
                <div className="overflow-x-auto border rounded-md">
                    <Table>
                        <TableHeader className="bg-[#FFEB94]/40">
                            <TableRow>
                                <TableHead>Date Submitted</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Amount Approved</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableHead colSpan={5} className="text-center text-sm text-gray-500 py-8">
                                    No reimbursement requests yet
                                </TableHead>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {/* Reimbursement Summary Section */}
            <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Reimbursement Summary</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Total Claimed */}
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-600">Total Claimed</p>
                        <p className="text-2xl font-bold">₱0.00</p>
                        <p className="text-xs text-gray-500 mt-1">total amount claimed</p>
                    </div>

                    {/* Total Approved */}
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-600">Total Approved</p>
                        <p className="text-2xl font-bold">₱0.00</p>
                        <p className="text-xs text-gray-500 mt-1">total amount approved</p>
                    </div>

                    {/* Pending */}
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-600">Pending</p>
                        <p className="text-2xl font-bold">₱0.00</p>
                        <p className="text-xs text-gray-500 mt-1">awaiting approval</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}