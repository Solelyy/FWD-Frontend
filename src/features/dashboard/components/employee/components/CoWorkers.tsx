import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CoWorkers() {
    return (
        <div className="flex flex-col flex-1">
            <p className="mb-2 text-sm font-light lg:text-base">Other Present Today</p>

            <Card className="px-6 py-5 lg:px-8 lg:py-6">
                <div className="overflow-x-auto rounded-xl border">
                    <Table className="lg:text-base">
                        <TableHeader className="bg-[#FFEB94]/40">
                            <TableRow>
                                <TableHead>Employee Name</TableHead>
                                <TableHead>Time In</TableHead>
                                <TableHead>Time Out</TableHead>
                            </TableRow>
                        
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={6} className="py-10 text-center lg:py-12">
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