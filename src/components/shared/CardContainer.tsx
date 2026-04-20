type Props = {
    title: string;
    description?: string;
    children: React.ReactNode
}
export default function CardContainer({title, description, children}: Props) {
    return(
       <div className="w-full rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
            <div className="mb-4 space-y-1">
                <h2 className="text-base font-semibold md:text-lg">{title}</h2>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>

            <div className="flex gap-4 text-sm md:text-base">
                {children}
            </div>
        </div> 
    );
}