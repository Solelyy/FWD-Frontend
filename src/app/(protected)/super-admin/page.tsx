"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
import { CardLayout } from "@/components/shared/CardLayout";
export default function SuperAdminDashboard() {
    const user = useUser();
    return(
    <ContentLayout title="Dashboard">
        <div className="flex flex-col gap-4">
            <p className="text-2xl font-semibold">Good Day, {user.firstname}!</p>
            
            <CardLayout/>
        </div>
    </ContentLayout>
    );
}