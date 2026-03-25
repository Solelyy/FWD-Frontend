"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export default function Notifications() {
    return ( 
        <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                <Button
                    className="rounded-full w-8 h-8 bg-background mr-2"
                    variant="outline"
                    size="icon"
                >
                    <Bell className="h-8 w-8 transition-transform dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Notifications</span>
                </Button>
                </TooltipTrigger>
            <TooltipContent side="bottom">Notifications</TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}