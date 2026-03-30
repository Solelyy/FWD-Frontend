import  { Skeleton } from "@/components/ui/skeleton";
import { TableRow, TableCell } from "../ui/table";

function getSkeletonWidth(col: string) {
  switch (col) {
    case "id":
      return "h-4 w-full max-w-[80px]";
    case "name":
      return "h-4 w-full max-w-[180px]";
    case "email":
      return "h-4 w-full max-w-[220px]";
    case "status":
      return "h-4 w-full max-w-[100px]";
    case "invitationDate":
      return "h-4 w-full max-w-[160px]";
    default:
      return "h-4 w-full";
  }
}

export function SkeletonTableRows({ showAction, columns }: { showAction?: boolean, columns:string[] }) {
  return [...Array(6)].map((_, i) => (
    <TableRow key={i}>
      
      {columns.map((col) => (
        <TableCell key={col}>
          <Skeleton className={getSkeletonWidth(col)} />
        </TableCell>
      ))}

      {showAction && (
        <TableCell>
          <Skeleton className="h-6 w-8" />
        </TableCell>
      )}
      
    </TableRow>
  ));
}