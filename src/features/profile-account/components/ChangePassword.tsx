"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { useState } from "react";

export default function ChangePassword() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className="overflow-hidden">
            <div className="border-b px-4 py-4 md:px-6">
                <h2 className="text-lg font-semibold">Security</h2>
                <p className="mt-1 text-sm text-muted-foreground">Manage your password and account security.</p>
            </div>

            <div className="p-4 md:p-6">
            <div className="mb-4 rounded-lg border border-border/70 bg-card p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <Lock size={20} className="text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Change Password</p>
                            <p className="mt-1 text-xs font-medium text-muted-foreground">Update your password regularly to keep your account secure.</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? "Cancel" : "Change"}
                    </Button>
                </div>
            </div>

            {isOpen && (
                <div className="space-y-4 rounded-lg border border-border/70 bg-muted/20 p-4">
                    <div>
                        <label className="text-sm font-medium text-foreground">Current Password</label>
                        <Input
                            type="password"
                            placeholder="Enter your current password"
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-foreground">New Password</label>
                        <Input
                            type="password"
                            placeholder="Enter your new password"
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                        <Input
                            type="password"
                            placeholder="Confirm your new password"
                            className="mt-2"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button>Save Changes</Button>
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
            </div>
        </Card>
    )
}
