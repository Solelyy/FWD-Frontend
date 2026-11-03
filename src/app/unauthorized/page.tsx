"use client"
import { LockKeyhole } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import  { useRouter } from "next/navigation";
import { useUser } from "@/components/providers/UserContext";
import { UserRole } from "@/lib/types/roles";

export default function UnauthorizedPage() {
    const {user} = useUser();
    const router = useRouter();

    const handleDestination = () => {
        if (!user) {
            return router.replace("/");
        }

        switch (user.role) {
        case UserRole.ADMIN:
          console.log("Redirecting to admin...")
          router.replace("/admin");
          break;

        case UserRole.SUPER_ADMIN:
          console.log("Redirecting to super admin...")
          router.replace("/super-admin");
          break;

        case UserRole.EMPLOYEE:
          console.log("Redirecting to employee...")
          router.replace("/employee");
          break;
        }
    }
    
    return (
        <div className="hero-section flex min-h-screen flex-col items-center justify-center gap-8 px-4 sm:px-6">
            <main className="flex w-full flex-1 flex-col items-center justify-center">
                <Card className="h-auto w-full max-w-sm px-6 py-8 text-center sm:max-w-md sm:py-10 md:max-w-lg">
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
                        <Button className="w-full" onClick={handleDestination}>
                            Go to Home
                        </Button>
                    </div>
                </Card>
            </main>
        </div>
    );
}