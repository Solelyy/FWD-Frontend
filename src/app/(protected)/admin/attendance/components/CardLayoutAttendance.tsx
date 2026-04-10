import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";

type CardLayoutProps = {
    title:string
    dataCount?: number;
    isLoading?: boolean
}

export function CardLayoutAttendance({title, dataCount, isLoading} : CardLayoutProps) {
    return (
        <Card className="text-sm md:text-base w-full h-auto">
            <CardHeader >
                <CardTitle className="font-medium">{title}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-row items-center justify-start gap-2">
                {isLoading ?  (
                    <Skeleton className="h-8 w-10"/>
                ) : (             
                    <CardTitle className="text-2xl">{dataCount}</CardTitle>
                )}
            </CardContent>

            {/* this is for additional details, not needed for now
            <CardDescription className="flex items-center justify-center gap-2">
                <span></span>
            </CardDescription>
             */}
        </Card>
    );
}