import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

export default function LeaveTable() {
    return (
        <div className="space-y-6">
            {/* Leave Requests Section */}
            <Card className="p-4 md:p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Leave Requests</h2>
                    <Button>
                        <Plus />
                        Request Leave
                    </Button>
                </div>
                
                <div className="overflow-x-auto border rounded-md">
                    <Table>
                        <TableHeader className="bg-[#FFEB94]/40">
                            <TableRow>
                                <TableHead>Date Submitted</TableHead>
                                <TableHead>Leave Type</TableHead>
                                <TableHead>Leave Date/s</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableHead colSpan={4} className="text-center text-sm text-gray-500 py-8">
                                    No leave requests yet
                                </TableHead>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {/* Remaining Leaves Section */}
            <Card className="p-6">
                <h2 className="text-lg font-semibold">Remaining Leaves</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Sick Leave */}
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-600">Sick Leave</p>
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-xs text-gray-500 mt-1">days remaining</p>
                    </div>

                    {/* Vacation Leave */}
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-600">Vacation Leave</p>
                        <p className="text-2xl font-bold">10</p>
                        <p className="text-xs text-gray-500 mt-1">days remaining</p>
                    </div>

                    {/* Casual Leave */}
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-600">Casual Leave</p>
                        <p className="text-2xl font-bold">3</p>
                        <p className="text-xs text-gray-500 mt-1">days remaining</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}