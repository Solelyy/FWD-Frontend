import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { useState } from "react";

export default function ChangePassword() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Security</h2>
            </div>

            <div className="border rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Lock size={20} className="text-gray-600" />
                        <div>
                            <p className="text-sm font-medium">Change Password</p>
                            <p className="text-xs text-gray-500 font-medium dark:text-gray-400 mt-1">Update your password regularly to keep your account secure</p>
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
                <div className="border rounded-lg p-4 bg-slate-50 space-y-4">
                    <div>
                        <label className="text-sm font-medium">Current Password</label>
                        <Input
                            type="password"
                            placeholder="Enter your current password"
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">New Password</label>
                        <Input
                            type="password"
                            placeholder="Enter your new password"
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Confirm New Password</label>
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
        </Card>
    )
}
