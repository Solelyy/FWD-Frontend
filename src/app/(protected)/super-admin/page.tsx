"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
export default function SuperAdminDashboard() {
    const user = useUser();
    const fullName = `${user.firstname} ${user.lastname}`
    return(
    <ContentLayout title="Dashboard">
        <div>
            HELLO, {fullName}!
        </div>
    </ContentLayout>
    );
}