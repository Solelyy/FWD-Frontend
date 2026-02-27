"use client"

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {useUser} from "@/context/UserContext"
export default function SuperAdminDashboard() {
    const user = useUser();
    return(
    <ContentLayout title="Dashboard">
    <div>
        
    </div>
    </ContentLayout>
    );
}