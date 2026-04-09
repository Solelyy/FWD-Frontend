import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, CalendarCheck } from "lucide-react";

export default function Reports() {
    return (
        <div className="space-y-6">
            {/* Generate Report Section */}
            <Card className="p-6">
                <h2 className="text-lg font-semibold">My Reports</h2>
                <div className="border rounded-lg bg-slate-50 hover:bg-slate-100 py-2 px-4 flex gap-3 items-center cursor-pointer w-50 justify-between transition-colors">
                    <p className="text-sm font-medium">This month</p>
                    <CalendarCheck size={18}/>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium mb-3">Select modules to include:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Attendance */}
                            <div className="flex items-center space-x-6 border rounded-lg p-3">
                                <Checkbox id="attendance" />
                                <label htmlFor="attendance" className="text-sm cursor-pointer">
                                    Attendance Records
                                </label>
                            </div>

                            {/* Leave */}
                            <div className="flex items-center space-x-2 border rounded-lg p-3">
                                <Checkbox id="leave" />
                                <label htmlFor="leave" className="text-sm cursor-pointer">
                                    Leave Requests
                                </label>
                            </div>

                            {/* Cash Advance */}
                            <div className="flex items-center space-x-2 border rounded-lg p-3">
                                <Checkbox id="cashAdvance" />
                                <label htmlFor="cashAdvance" className="text-sm cursor-pointer">
                                    Cash Advance Requests
                                </label>
                            </div>

                            {/* Reimbursement */}
                            <div className="flex items-center space-x-2 border rounded-lg p-3">
                                <Checkbox id="reimbursement" />
                                <label htmlFor="reimbursement" className="text-sm cursor-pointer">
                                    Reimbursement Requests
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button className="flex gap-2">
                            <Download size={18} />
                            Generate Report
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Report Summary Section */}
            <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Attendance */}
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-600">Attendance</p>
                        <p className="text-2xl font-bold">0%</p>
                        <p className="text-xs text-gray-500 mt-1">attendance rate</p>
                    </div>

                    {/* Leave */}
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-600">Leave Used</p>
                        <p className="text-2xl font-bold">0/15</p>
                        <p className="text-xs text-gray-500 mt-1">days used</p>
                    </div>

                    {/* Cash Advance */}
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-600">Cash Advanced</p>
                        <p className="text-2xl font-bold">₱0.00</p>
                        <p className="text-xs text-gray-500 mt-1">total advanced</p>
                    </div>

                    {/* Reimbursement */}
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-600">Reimbursed</p>
                        <p className="text-2xl font-bold">₱0.00</p>
                        <p className="text-xs text-gray-500 mt-1">total reimbursed</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}
                
              