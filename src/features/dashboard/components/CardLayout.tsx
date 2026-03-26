import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";

type CardLayoutProps = {
    title:string
    icon: React.ReactNode;
    dataCount?: number;
    isLoading?: boolean
}

const iconStyle = "w-6 h-6 text-yellow-500 flex-shrink-0"
export function CardLayout({title, icon, dataCount, isLoading} : CardLayoutProps) {
    return (
        <Card className="w-full h-30">
            <CardHeader >
                <CardTitle className="font-medium">{title}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-row items-center justify-start gap-2">
                <div className={iconStyle}>{icon}</div>
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