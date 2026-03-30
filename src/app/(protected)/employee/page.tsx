"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import { useUser } from "@/components/providers/UserContext"
import CoWorkers from "@/features/dashboard/components/employee/CoWorkers";
import QuickActions from "@/features/dashboard/components/employee/QuickActions";
import Requests from "@/features/dashboard/components/employee/Requests";
import TimeinOut from "@/features/dashboard/components/employee/TimeInOut";

export default function EmployeeDashboard() {
    const { user } = useUser();
    return(
    <ContentLayout title="Dashboard">
        <div className="flex flex-col gap-6">
            <p className="text-xl font-medium">Good Day, {user?.firstname}!</p>

            {/* Quick actions */}
            <QuickActions />

            <div className="flex flex-col md:flex-row gap-8 items-stretch">
                <TimeinOut />
                <Requests />
            </div>

            <CoWorkers />
    
        </div>
    </ContentLayout>
    );
}