import { Skeleton } from "@/components/ui/skeleton";

type CardLayoutProps = {
    title:string
    dataCount?: number;
    isLoading?: boolean
    description?: string
    icon?: React.ReactNode
}

export function CardLayoutV2({title, dataCount, isLoading, description, icon} : CardLayoutProps) {
    return (
        <div className="w-full rounded-xl border border-border/60 bg-background p-4 text-sm md:text-base">
            <div className="font-medium text-foreground/90">{title}</div>

            <div className="mt-2 flex flex-row items-center justify-start gap-2">
                {icon}
                {isLoading ?  (
                    <Skeleton className="h-8 w-10"/>
                ) : (             
                    <p className="text-2xl font-semibold tracking-tight text-foreground">
                          {dataCount !== undefined ? dataCount.toFixed(2) : "0.00"}
                    </p>
                )}
            </div>
            
            {description && (
                <p className="mt-2 text-sm text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}