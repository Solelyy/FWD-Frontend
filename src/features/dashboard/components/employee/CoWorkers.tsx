import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CoWorkers() {
    return (
        <div className="flex flex-col flex-1">
            <p className="font-light text-sm mb-2">Other Present Today</p>

            <Card className="px-6">
                <div className="overflow-x-auto border rounded-md">
                    <Table>
                        <TableHeader className="bg-[#FFEB94]/40">
                            <TableRow>
                                <TableHead>Employee Name</TableHead>
                                <TableHead>Time In</TableHead>
                                <TableHead>Time Out</TableHead>
                            </TableRow>
                        
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    No records yet. 
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}