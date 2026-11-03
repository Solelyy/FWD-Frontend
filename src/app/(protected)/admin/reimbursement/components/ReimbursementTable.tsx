"use client"

import { PaginationSimple } from "@/components/shared/Pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { EmployeeReimbursementRequests, EmployeeReimbursementRequest } from "../types/reimbursement";
import { AttendanceLogsSkeletonRows } from "@/components/skeletons/AttendanceLogsSkeleton";
import { formatTableDate } from "@/lib/util/date-format";
import { fullName } from "@/lib/util/name-format";
import { ReimbursementRequestStatus, ReimbursementType } from "@/app/(protected)/employee/reimbursement/types/reimbursement";
import ReimbursementActions from "./ReimbursementActions";
import { formatPeso } from "@/lib/util/currency-format";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ViewAdditionalInfo from "../../leave/components/ViewAdditionalInfo";

type Props = {
    data?: EmployeeReimbursementRequests
    isLoading: boolean;
    error: Error | null;
    page: number
    setPage: (page: number)=> void
    searchTerm?: string
}
export default function ReimbursementTable({data, isLoading, error, page, setPage, searchTerm = ""}: Props) {
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<EmployeeReimbursementRequest| null>(null);

    const handleShowAdditionalInfo = (record: EmployeeReimbursementRequest) => {
        setSelectedRecord(record);
        setShowAdditionalInfo(true);
    }

    const requests= data?.requests ?? [];

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredRequests = requests.filter((request) => {
        if (!normalizedSearch) return true;

        const fullName = `${request.firstname} ${request.lastname}`.toLowerCase();
        const employeeId = request.employeeId.toLowerCase();

        return (
            fullName.includes(normalizedSearch) ||
            employeeId.includes(normalizedSearch)
        );
    });

    const formatText = (type: ReimbursementType) => {
        const format = type === ReimbursementType.FOOD 
            ? "Food" 
            : ReimbursementType.OTHER
            ? "Other" : "Transportation"
    
            return format;
    }
    
    const actionMade = selectedRecord?.status !== ReimbursementRequestStatus.PENDING;
    
    return (
        <>
        <div className="flex flex-col space-y4">
            
            <div className="flex-1 overflow-x-auto border rounded-md">
                <Table>
                    <TableHeader className="bg-muted/60">
                        <TableRow>
                            <TableHead>Date Submitted</TableHead>
                            <TableHead>Employee</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Amount Requested</TableHead>
                            <TableHead>Amount Approved</TableHead>
                            <TableHead>Additional Info</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                            
                    <TableBody>
                        {isLoading && (
                            <AttendanceLogsSkeletonRows />
                        )}
                            
                        {error && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-red-400">
                                    Failed to load accounts.
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && !error && filteredRequests.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8">
                                    {normalizedSearch ? "No results found" : "No reimbursement records yet."}
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && !error && filteredRequests.length > 0 && filteredRequests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>
                                    {formatTableDate(request.dateSubmitted)}
                                </TableCell>

                                <TableCell>
                                    {fullName(request.firstname, request.lastname)}
                                </TableCell>

                                <TableCell>
                                    {formatText(request.type)}
                                </TableCell>

                                <TableCell>
                                    {formatPeso(request.requestedAmount)}
                                </TableCell>

                                <TableCell>
                                    {formatPeso(request.approvedAmount)}
                                </TableCell>

                                <TableCell>
                                    <Button variant="outline" className="px-6" onClick={() => handleShowAdditionalInfo(request)}>
                                        View
                                    </Button>
                                </TableCell>
                                
                                <TableCell>
                                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
                                        request.status === ReimbursementRequestStatus.APPROVED
                                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300"
                                            : request.status === ReimbursementRequestStatus.REJECTED
                                            ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                                            : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300"
                                    }`}>
                                        {request.status}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    <ReimbursementActions request={request}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> 
            </div>
        </div>

        <ViewAdditionalInfo 
            open={showAdditionalInfo} 
            setOpen={setShowAdditionalInfo} 
            reason={selectedRecord?.reason}
            attachment={selectedRecord?.attachment}
            isWithAttachment={true}
            actionMade={actionMade}
            status={selectedRecord?.status}
            actionDetails={selectedRecord?.actionMade}
        />
        
        {/*<PaginationSimple />  */} 
        </>
    ); 
}