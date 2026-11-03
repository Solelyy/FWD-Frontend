"use client"

import { useUser } from "@/components/providers/UserContext";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

export default function ProfileInfo() {
    const { user } = useUser();
    const titleStyle = "text-xs font-medium uppercase tracking-wide text-muted-foreground"
    return (
        <Card className="w-full overflow-hidden">
            <div className="border-b px-4 py-4 md:px-6">
                <h2 className="text-lg font-semibold">Profile Information</h2>
                <p className="mt-1 text-sm text-muted-foreground">Your account details and contact information.</p>
            </div>
            
            <div className="flex w-full flex-col items-center gap-5 p-4 md:flex-row md:items-start md:p-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                        <User size={48} className="text-primary" />
                    </div>
                </div>

                {/* Profile Details */}
                <div className="w-full min-w-0 flex-1">
                    <div className="grid gap-4 rounded-lg border border-border/70 bg-card p-4 sm:grid-cols-2 sm:p-5">
                        {/* Name */}
                        <div>
                            <p className={titleStyle}>Full Name</p>
                            <p className="mt-1 text-base font-medium">{user?.firstname} {user?.lastname}</p>
                        </div>

                        {/* Email */}
                        <div>
                            <p className={titleStyle}>Email</p>
                            <p className="mt-1 text-base font-medium">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
