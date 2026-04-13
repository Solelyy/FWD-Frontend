import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export function AttendanceLogsSkeletonRows() {
	return [...Array(6)].map((_, index) => (
		<TableRow key={index}>
			<TableCell>
				<Skeleton className="h-4 w-full max-w-32.5" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-4 w-full max-w-22.5" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-4 w-full max-w-22.5" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-4 w-full max-w-20" />
			</TableCell>
		</TableRow>
	));
}
