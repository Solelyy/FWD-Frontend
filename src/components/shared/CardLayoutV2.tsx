import { Skeleton } from "@/components/ui/skeleton";

type CardLayoutProps = {
    title:string
    dataCount?: number;
    isLoading?: boolean;
    description?: string;
    icon?: React.ReactNode;
    showDecimal?: boolean
    valueSuffix?: string;
    iconTone?: "primary" | "success" | "warning";

}

export function CardLayoutV2({title, dataCount, isLoading, description, icon, showDecimal, valueSuffix, iconTone = "primary"} : CardLayoutProps) {
    const iconToneStyles = {
        primary: "border-primary/20 bg-primary/10 text-primary",
        success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        warning: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    };

    return (
        <div className="min-w-0 w-full h-full rounded-lg border border-border/70 bg-card p-4 text-sm shadow-xs transition-colors hover:border-border md:p-5 md:text-base">
            <div className="text-sm font-medium text-muted-foreground">{title}</div>

            <div className="mt-3 flex flex-row items-center justify-start gap-3">
                {icon && (
                    <div className={`inline-flex h-9 w-9 items-center justify-center rounded-md border [&_svg]:h-4 [&_svg]:w-4 ${iconToneStyles[iconTone]}`}>
                        {icon}
                    </div>
                )}
                {isLoading ?  (
                    <Skeleton className="h-8 w-10"/>
                ) : (             
                    <p className="wrap-break-word text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
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