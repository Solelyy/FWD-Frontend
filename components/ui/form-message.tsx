"use client";

import { cn } from "@/lib/utils";

type FormMessageProps = {
  message?: string
  variant?: "success" | "error" | "info"
  className?: string
}

export function FormMessage({ message, variant = "error", className }: FormMessageProps) {
  if (!message) return null;

  const variantStyles = {
    error: "text-red-400",
    success: "text-green-600",
    info: "text-blue-500",
  }

  return (
    <p className={cn("text-sm font-medium", variantStyles[variant], className)}>
      {message}
    </p>
  )
}