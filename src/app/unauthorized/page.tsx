import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
export default function UnauthorizedPage() {
    return (
        <div className="hero-section flex flex-col gap-8 min-h-screen items-center justify-center">
            <main className="flex flex-1 w-full flex-col items-center justify-center px-6">
                <Card className="text-center p-6 h-full w-full max-w-sm sm:max-w-md md:max-w-lg py-8 px-6 sm:py-10">
                    {/* Icon */}
                    <div className="flex justify-center">
                        <div className="rounded-full bg-destructive/10 p-6">
                            <LockKeyhole className="w-12 h-12 text-destructive" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                        <h1 className="text-5xl font-bold tracking-tight">403</h1>
                        <h2 className="text-2xl font-semibold">Access Denied</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            You don't have permission to access this page. If you believe this is a mistake, please contact the administrator.
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