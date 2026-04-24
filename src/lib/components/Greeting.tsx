"use client"

import { useEffect, useMemo, useState } from "react";
import { UserRole } from "@/lib/types/roles";
import { greetingText } from "@/lib/util/name-format";

type GreetingProps = {
    firstname?: string | null;
    role?: UserRole | null;
    fallback?: string;
    animated?: boolean;
    className?: string;
};

function roleFallback(role?: UserRole | null) {
    switch (role) {
        case UserRole.ADMIN:
            return "Admin";
        case UserRole.SUPER_ADMIN:
            return "Super Admin";
        case UserRole.EMPLOYEE:
        default:
            return "Employee";
    }
}

export default function Greeting({
    firstname,
    role,
    fallback,
    animated = false,
    className = "",
}: GreetingProps) {
    const resolvedFallback = fallback ?? roleFallback(role);
    const fullGreeting = useMemo(() => greetingText(firstname, resolvedFallback), [firstname, resolvedFallback]);
    const [typedGreeting, setTypedGreeting] = useState(animated ? "" : fullGreeting);

    useEffect(() => {
        if (!animated) {
            setTypedGreeting(fullGreeting);
            return;
        }

        setTypedGreeting("");

        let index = 0;
        const timer = window.setInterval(() => {
            index += 1;
            setTypedGreeting(fullGreeting.slice(0, index));

            if (index >= fullGreeting.length) {
                window.clearInterval(timer);
            }
        }, 45);

        return () => window.clearInterval(timer);
    }, [animated, fullGreeting]);

    return (
        <p className={className}>
            {typedGreeting}
            {animated && typedGreeting !== fullGreeting && (
                <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-foreground align-middle" />
            )}
        </p>
    );
}