import React from "react";

type Props = {
    title?: string;
    description?: string;
    children: React.ReactNode
    gridClassName?: string;
}
export default function CardContainerRequests({children, gridClassName = "grid-cols-1 sm:grid-cols-3"}: Props) {
    const items = React.Children.toArray(children);
    const cardCount = items.length;

    return(
       <div className="w-full rounded-xl border border-border/70 bg-card p-3 shadow-sm sm:p-4">
            {/* 
            <div className="mb-4 space-y-1">
                <h2 className="text-base font-semibold md:text-lg">{title}</h2>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>*/}

            <div className={`grid w-full gap-3 text-sm md:text-base ${gridClassName}`}>
                {items.map((item, index) => {
                    const spanClass = cardCount === 1
                        ? "col-span-1 sm:col-span-3"
                        : cardCount === 2
                            ? "col-span-1 sm:col-span-1"
                            : "col-span-1";

                    return (
                        <div key={index} className={`${spanClass} h-full`}>
                            {item}
                        </div>
                    );
                })}
            </div>
        </div> 
    );
}