import { PaginationSimple } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarCheck } from "lucide-react";
import { ArrowDownToLine } from "lucide-react";

export default function AttendanceLogs() {
    return (
        <Card className="p-4 h-140">
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-2 items-center">
                    <p className="text-sm">Filter by</p>

                    <div className="border rounded py-2 px-4 flex gap-15 items-center">
                    <p className="text-sm">This month</p>
                    <CalendarCheck size={15}/>
                </div>
                </div>

                <div>
                    <Button> 
                        <ArrowDownToLine />
                        Download Report
                    </Button>
                </div>
            </div>
           
            <div className="flex-1 overflow-x-auto border rounded-md">
               <Table>
                    <TableHeader className="bg-[#FFEB94]/40">
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Time In</TableHead>
                            <TableHead>Time Out</TableHead>
                            <TableHead>Location</TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                        <TableRow>

                        </TableRow>
                    </TableBody>
               </Table> 
            </div>
            
            <PaginationSimple />
        </Card>
    );
}