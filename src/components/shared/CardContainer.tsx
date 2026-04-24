import React from "react";

type Props = {
    title: string;
    description?: string;
    children: React.ReactNode
}
export default function CardContainer({title, description, children}: Props) {
    const items = React.Children.toArray(children);
    const cardCount = items.length;

    return(
       <div className="w-full rounded-2xl border border-border/60 bg-background p-4 shadow-sm sm:p-5">
            {/* 
            <div className="mb-4 space-y-1">
                <h2 className="text-base font-semibold md:text-lg">{title}</h2>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>*/}

            <div className="grid w-full grid-cols-2 gap-4 text-sm md:text-base md:grid-cols-4">
                {items.map((item, index) => {
                    const spanClass = cardCount === 1
                        ? "col-span-2 md:col-span-4"
                        : cardCount === 2
                            ? "col-span-1 md:col-span-2"
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