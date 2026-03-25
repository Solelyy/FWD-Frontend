import  { Skeleton } from "@/components/ui/skeleton";
import { TableRow, TableCell } from "../ui/table";
import { UserRole } from "@/lib/types/roles";

export function SkeletonTableRows({showAction} : {showAction: boolean | undefined} ) {
  return [...Array(6)].map((_, i) => (
    <TableRow key={i}>
      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
      <TableCell><Skeleton className="h-4 w-37.5" /></TableCell>
      <TableCell><Skeleton className="h-4 w-50" /></TableCell>
      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
      <TableCell><Skeleton className="h-4 w-35" /></TableCell>

      {showAction && (
        <TableCell><Skeleton className="h-6 w-7.5" /></TableCell>
      )}
      
    </TableRow>
  ))
}