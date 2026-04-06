import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="hero-section flex flex-col gap-8 min-h-screen items-center justify-center">
      <main className="flex flex-1 w-full flex-col items-center justify-center px-6">
        <Card className="text-center p-6 h-full w-full max-w-sm sm:max-w-md md:max-w-lg py-8 px-6 sm:py-10">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="rounded-full bg-yellow-100 p-6">
              <AlertCircle className="w-12 h-12 text-yellow-600" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The page you're looking for doesn't exist.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <Link href="/">
              <Button className="w-full">
                Go to Home
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}