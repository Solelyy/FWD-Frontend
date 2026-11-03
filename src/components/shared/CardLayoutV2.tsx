import { Skeleton } from "@/components/ui/skeleton";

type CardLayoutProps = {
    title:string
    dataCount?: number;
    isLoading?: boolean;
    description?: string;
    icon?: React.ReactNode;
    showDecimal?: boolean
    valueSuffix?: string;
    valueAdornment?: React.ReactNode;
    iconTone?: "primary" | "blue" | "success" | "warning" | "orange" | "danger" | "neutral";

}

export function CardLayoutV2({title, dataCount, isLoading, description, icon, showDecimal, valueSuffix, valueAdornment, iconTone = "primary"} : CardLayoutProps) {
    const iconToneStyles = {
        primary: "border-primary/20 bg-primary/10 text-primary",
        blue: "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
        success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        warning: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
        orange: "border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400",
        danger: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
        neutral: "border-border bg-muted text-muted-foreground",
    };

    return (
        <div className="min-w-0 w-full h-full rounded-lg border border-border/70 bg-card p-4 text-sm shadow-xs transition-colors hover:border-border md:p-5 md:text-base">
            <div className="text-sm font-medium text-muted-foreground">{title}</div>

            <div className="mt-3 flex flex-row flex-wrap items-center justify-start gap-3">
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
                {valueAdornment}
            </div>
            
            {description && (
                <p className="mt-2 text-xs md:text-sm text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}