import { Skeleton } from "@/components/ui/skeleton";

type CardLayoutProps = {
    title:string
    dataCount?: number;
    isLoading?: boolean;
    description?: string;
    icon?: React.ReactNode;
    showDecimal?: boolean
    valueSuffix?: string;

}

export function CardLayoutV2({title, dataCount, isLoading, description, icon, showDecimal, valueSuffix} : CardLayoutProps) {
    return (
        <div className="min-w-0 w-full h-full rounded-xl border border-border/60 bg-background p-4 text-sm md:text-base">
            <div className="font-medium text-foreground/90">{title}</div>

            <div className="mt-2 flex flex-row items-center justify-start gap-2">
                {icon && (
                    <div className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-muted text-foreground/80 [&_svg]:h-3.5 [&_svg]:w-3.5">
                        {icon}
                    </div>
                )}
                {isLoading ?  (
                    <Skeleton className="h-8 w-10"/>
                ) : (             
                    <p className="wrap-break-word text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                        {dataCount !== undefined 
                        ? showDecimal
                        ? dataCount.toFixed(2) 
                        : dataCount
                        : "0.00"}
                        {valueSuffix ?? ""}
                    </p>
                )}
            </div>
            
            {description && (
                <p className="mt-2 text-xs md:text-sm text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}