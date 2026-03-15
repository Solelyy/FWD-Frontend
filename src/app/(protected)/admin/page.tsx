"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
export default function AdminDashboard() {
    const user = useUser();
    return(
    <ContentLayout title="Dashboard">
        <div>
            HELLO, {user.firstname}!
        </div>
    </ContentLayout>
    );
}