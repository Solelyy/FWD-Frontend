"use client"

import { ContentLayout } from "@/components/shared/layout/panel/content-layout";
import {useUser} from "@/components/shared/providers/UserContext"
export default function SuperAdminDashboard() {
    const user = useUser();
    return(
    <ContentLayout title="Dashboard">
    <div>
        HELLO, {user.firstname}!
    </div>
    </ContentLayout>
    );
}