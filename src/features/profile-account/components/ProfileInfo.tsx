"use client"
import { useUser } from "@/components/providers/UserContext";
import { Card } from "@/components/ui/card";
import { User} from "lucide-react";

export default function ProfileInfo() {
    const { user } = useUser();
    const titleStyle = "text-xs text-gray-500 font-medium dark:text-gray-400"
    return (
        <Card className="p-4 md:p-6">
            <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Avatar Section */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="w-24 h-24 bg-linear-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                        <User size={48} className="text-white" />
                    </div>
                </div>

                {/* Profile Details */}
                <div className="flex-1">
                    <div className="border rounded-lg p-6 space-y-4">
                        {/* Name */}
                        <div>
                            <p className={titleStyle}>Full Name</p>
                            <p className="text-base mt-1">{user?.firstname} {user?.lastname}</p>
                        </div>

                        {/* Email */}
                        <div>
                            <p className={titleStyle}>Email</p>
                            <p className="text-base mt-1">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
